import slugify from "slugify";

export default function teamSlug(name: string): string {
  return slugify(name, { lower: true });
}
