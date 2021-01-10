import jsonStringifyPrettyCompact from "json-stringify-pretty-compact";

export default function jsonStringify(data: unknown): string {
  return jsonStringifyPrettyCompact(data, { indent: 2, maxLength: 80 });
}
