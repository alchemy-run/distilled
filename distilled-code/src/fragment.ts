export interface Fragment<
  Type extends string,
  Name extends string,
  References extends any[],
> {
  readonly type: Type;
  /**
   * The identifier for this fragment.
   * Uses `id` instead of `name` to avoid conflicts with JavaScript's
   * built-in `name` property on classes/functions.
   */
  readonly id: Name;
  readonly template: TemplateStringsArray;
  readonly references: References;
}
