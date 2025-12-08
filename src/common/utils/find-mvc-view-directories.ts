import { readdirSync } from "fs";
import { join } from "path";

export function findMvcViewDirectories(root: string): string[] {
  const stack = [root];
  const dirs = new Set<string>();

  while (stack.length) {
    const current = stack.pop()!;
    const entries = readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(current, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name.endsWith(".ejs")) {
        dirs.add(current);
      }
    }
  }

  return dirs.size ? Array.from(dirs) : [root];
}
