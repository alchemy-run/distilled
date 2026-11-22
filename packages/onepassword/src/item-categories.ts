/**
 * Typed profiles for 1Password item categories.
 *
 * A profile names a category's fields once (id, title, type, secret or not)
 * and gives you `create`, `read`, `field`, `update` and `is` over plain
 * `Item`s from the SDK operations (`getItem`, `createItem`, `putItem`).
 * Secret fields are `Redacted<string>` on read and accept `Redacted` on write.
 *
 * @example Built-in profile
 * ```ts
 * import { ItemCategories, Sdk } from "@distilled.cloud/onepassword";
 *
 * const params = ItemCategories.Login.create({
 *   vaultId,
 *   title: "GitHub",
 *   websites: [],
 *   values: { username: "octocat", password: Redacted.make("hunter2") },
 * });
 * const item = yield* Sdk.createItem({ params });
 *
 * const { username, password, totp } = ItemCategories.Login.read(item);
 * // username: string | undefined, password: Redacted<string> | undefined
 * ```
 *
 * @example Category without a built-in profile
 * Upstream does not document field ids for categories other than the ones
 * built in below. Create one such item in the 1Password app, read it with
 * `getItem`, and copy the ids and field types you see in `item.fields`.
 * ```ts
 * const ApiCredentials = ItemCategories.defineCategory("ApiCredentials", {
 *   // ids below are placeholders: use the ones your items actually have
 *   credential: { id: "<field id>", title: "credential", fieldType: "Concealed", secret: true },
 *   hostname: { id: "<field id>", title: "hostname", fieldType: "Text" },
 * });
 * ```
 */
import * as Redacted from "effect/Redacted";
import type {
  Item,
  ItemCategory,
  ItemCreateParams,
  ItemField,
  ItemFieldType,
  ItemOverview,
  ItemSection,
} from "./services/sdk.ts";

export interface FieldSpec {
  readonly id: string;
  readonly title: string;
  readonly fieldType: ItemFieldType;
  /** Section the field lives in; added to the item's sections on create/update. Omit for built-in fields. */
  readonly section?: ItemSection;
  /** Read as Redacted; accepts Redacted on write. */
  readonly secret?: boolean;
}

export type FieldSpecs = Readonly<Record<string, FieldSpec>>;

export type WriteValues<F extends FieldSpecs> = {
  readonly [K in keyof F]?: F[K]["secret"] extends true
    ? string | Redacted.Redacted<string>
    : string;
};

export type ReadValues<F extends FieldSpecs> = {
  readonly [K in keyof F]:
    | (F[K]["secret"] extends true ? Redacted.Redacted<string> : string)
    | undefined;
};

export interface CategoryProfile<C extends ItemCategory, F extends FieldSpecs> {
  readonly category: C;
  readonly fields: F;
  /** Build `createItem`'s `params`. */
  create(
    input: Omit<ItemCreateParams, "category" | "fields"> & {
      readonly values?: WriteValues<F>;
      readonly extraFields?: ReadonlyArray<ItemField>;
    },
  ): ItemCreateParams;
  /** Read the profile's fields from any item (no category check; use `is`). */
  read(item: Item): ReadValues<F>;
  /** The full field (with `details`: OTP code, SSH public key) behind a profile key. */
  field(item: Item, key: keyof F): ItemField | undefined;
  /** Copy of `item` with these values set (existing field updated, else appended + section added); pass to `putItem`. */
  update(item: Item, values: WriteValues<F>): Item;
  is(item: Item | ItemOverview): boolean;
}

type AnyValue = string | Redacted.Redacted<string>;

const plain = (value: AnyValue): string =>
  Redacted.isRedacted(value) ? Redacted.value(value) : value;

const dedupeSections = (sections: ReadonlyArray<ItemSection>): Array<ItemSection> => {
  const seen = new Set<string>();
  const out: Array<ItemSection> = [];
  for (const section of sections) {
    if (!seen.has(section.id)) {
      seen.add(section.id);
      out.push(section);
    }
  }
  return out;
};

export const defineCategory = <const C extends ItemCategory, const F extends FieldSpecs>(
  category: C,
  fields: F,
): CategoryProfile<C, F> => {
  const entries = Object.entries(fields) as Array<[keyof F & string, FieldSpec]>;

  const findField = (item: Item, spec: FieldSpec): ItemField | undefined => {
    const byId = item.fields.find((f) => f.id === spec.id);
    if (byId !== undefined) return byId;
    // App-created items can use other ids (e.g. TOTP): fall back on the field
    // type when it is unambiguous in both the profile and the item.
    if (entries.some(([, s]) => s !== spec && s.fieldType === spec.fieldType)) {
      return undefined;
    }
    const sameType = item.fields.filter((f) => f.fieldType === spec.fieldType);
    return sameType.length === 1 ? sameType[0] : undefined;
  };

  const makeField = (spec: FieldSpec, value: AnyValue): ItemField =>
    ({
      id: spec.id,
      title: spec.title,
      fieldType: spec.fieldType,
      value,
      ...(spec.section === undefined ? {} : { sectionId: spec.section.id }),
    }) as ItemField;

  return {
    category,
    fields,
    create: (input) => {
      const { values, extraFields, sections, ...rest } = input;
      const written: Array<ItemField> = [];
      const used: Array<ItemSection> = [];
      for (const [key, spec] of entries) {
        const value = (values as Record<string, AnyValue | undefined> | undefined)?.[key];
        if (value === undefined) continue;
        written.push(makeField(spec, value));
        if (spec.section !== undefined) used.push(spec.section);
      }
      const allSections = dedupeSections([...(sections ?? []), ...used]);
      return {
        ...rest,
        category,
        fields: [...written, ...(extraFields ?? [])],
        ...(allSections.length === 0 ? {} : { sections: allSections }),
      } as ItemCreateParams;
    },
    read: (item) => {
      const out: Record<string, AnyValue | undefined> = {};
      for (const [key, spec] of entries) {
        const found = findField(item, spec);
        if (found === undefined) {
          out[key] = undefined;
          continue;
        }
        const value = found.value as AnyValue;
        out[key] = spec.secret
          ? Redacted.isRedacted(value)
            ? value
            : Redacted.make(value)
          : plain(value);
      }
      return out as ReadValues<F>;
    },
    field: (item, key) => {
      const spec = fields[key];
      return spec === undefined ? undefined : findField(item, spec);
    },
    update: (item, values) => {
      let nextFields: Array<ItemField> = [...item.fields];
      let nextSections: Array<ItemSection> = [...item.sections];
      for (const [key, spec] of entries) {
        const value = (values as Record<string, AnyValue | undefined>)[key];
        if (value === undefined) continue;
        const existing = findField(item, spec);
        if (existing !== undefined) {
          nextFields = nextFields.map((f) => (f === existing ? ({ ...f, value } as ItemField) : f));
        } else {
          nextFields.push(makeField(spec, value));
          if (spec.section !== undefined) {
            nextSections = dedupeSections([...nextSections, spec.section]);
          }
        }
      }
      return { ...item, fields: nextFields, sections: nextSections } as Item;
    },
    is: (item) => item.category === category,
  };
};

export const Login = defineCategory("Login", {
  username: { id: "username", title: "username", fieldType: "Text" },
  password: {
    id: "password",
    title: "password",
    fieldType: "Concealed",
    secret: true,
  },
  totp: {
    id: "onetimepassword",
    title: "one-time password",
    fieldType: "Totp",
    secret: true,
    section: { id: "totp", title: "One-time password" },
  },
});

export const Password = defineCategory("Password", {
  password: {
    id: "password",
    title: "password",
    fieldType: "Concealed",
    secret: true,
  },
});

/** Content goes in `notes`. */
export const SecureNote = defineCategory("SecureNote", {});

/** Content goes in `document: { name, content }`. */
export const Document = defineCategory("Document", {});

export const SshKey = defineCategory("SshKey", {
  privateKey: {
    id: "private_key",
    title: "private key",
    fieldType: "SshKey",
    secret: true,
    section: { id: "ssh", title: "SSH key" },
  },
});
