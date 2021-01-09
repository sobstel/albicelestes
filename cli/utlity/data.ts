import fs from "fs";
import jsonStringify from "utility/jsonStringify";

const DATA_PATH = `${__dirname}/../../data`;
const resolvePath = (resource: string) => `${DATA_PATH}/${resource}.json`;

const TEMP_CACHE: Record<string, unknown> = {};

export function loadData(
  resource: string,
  opts?: { force?: boolean }
): unknown {
  if (!opts?.force && TEMP_CACHE[resource]) {
    return TEMP_CACHE[resource];
  }

  const path = resolvePath(resource);
  if (!fs.existsSync(path)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(path, "utf8"));
}

export function saveData(resource: string, data: unknown): void {
  const fileContent = jsonStringify(data);
  fs.writeFileSync(resolvePath(resource), fileContent, "utf8");
  TEMP_CACHE[resource] = data;
}
