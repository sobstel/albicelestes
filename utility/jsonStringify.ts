import jsonStringify from "json-stringify-pretty-compact";

export default function (data: unknown): string {
  return jsonStringify(data, { indent: 2, maxLength: 80 });
}
