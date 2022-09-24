import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  if (!existsSync(path.join(__dirname, "../dist"))) {
    await fs.mkdir(path.join(__dirname, "../dist"));
  }
  await Promise.all([
    fs.copyFile(
      path.join(__dirname, "../src/styles.module.css"),
      path.join(__dirname, "../dist/styles.module.css")
    ),
    fs.copyFile(
      path.join(__dirname, "../README.MD"),
      path.join(__dirname, "../dist/README.MD")
    ),
  ]);
}
main().catch((e) => {
  console.log(e);
});
