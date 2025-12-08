import { readFileSync, writeFileSync } from "fs";
import crypto from "crypto";

function usage(): never {
  console.error(
    "Usage: ts-node dev/env/env-crypto.ts <encrypt|decrypt> <inputFile> <outputFile> <passphrase>",
  );
  return process.exit(1);
}

const args = process.argv.slice(2);
const mode = args[0];
const inputFile = args[1];
const outputFile = args[2];
let passphrase = args[3];

if (passphrase === "--") {
  passphrase = args[4];
}

if (!mode || !inputFile || !outputFile || !passphrase) {
  usage();
}

if (mode !== "encrypt" && mode !== "decrypt") {
  usage();
}

if (mode === "encrypt") {
  const plaintext = readFileSync(inputFile);
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(passphrase, salt, 32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  const output = Buffer.concat([salt, iv, tag, encrypted]).toString("base64");
  writeFileSync(outputFile, output);
} else {
  const payload = Buffer.from(readFileSync(inputFile, "utf8"), "base64");
  const salt = payload.subarray(0, 16);
  const iv = payload.subarray(16, 28);
  const tag = payload.subarray(28, 44);
  const data = payload.subarray(44);
  const key = crypto.scryptSync(passphrase, salt, 32);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

  try {
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    writeFileSync(outputFile, decrypted);
  } catch (error) {
    console.error("Decryption failed: invalid passphrase or corrupted data.");
    process.exit(1);
  }
}
