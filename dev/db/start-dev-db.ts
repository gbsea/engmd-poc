#!/usr/bin/env ts-node

import { spawnSync } from "child_process";
import path from "path";

const isWindows = process.platform === "win32";
const script = path.join(__dirname, isWindows ? "run.ps1" : "run.sh");
const command = isWindows ? "powershell.exe" : "bash";
const args = isWindows
  ? ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", script]
  : [script];

const result = spawnSync(command, args, { stdio: "inherit" });

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
