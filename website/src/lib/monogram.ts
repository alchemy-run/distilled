/**
 * Stand-in mark for a provider with no brand icon: the first letter, or the
 * first letter of each part for a hyphenated name. Shared by the catalogue
 * tiles and the social cards `scripts/og.ts` renders.
 */
export const monogram = (short: string): string => {
  const parts = short.split("-").filter(Boolean);
  const letters =
    parts.length > 1
      ? parts
          .slice(0, 2)
          .map((p) => p[0])
          .join("")
      : short.slice(0, 1);
  return letters.toUpperCase();
};
