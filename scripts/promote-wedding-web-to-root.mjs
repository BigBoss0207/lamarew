import { copyFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * wedding-web/*.jpg 를 public 루트로 복사합니다.
 * 해당 번호에 weddingN.JPG / weddingN.jpg 가 이미 있으면 건너뜁니다.
 *
 * wedding-web 은 .gitignore 대상이라 배포에 안 올라가므로,
 * 실제 서빙 경로는 public 루트에 JPG가 있어야 합니다.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const webDir = path.join(publicDir, "wedding-web");

function main() {
  if (!existsSync(webDir)) return;

  const rootNames = new Set(readdirSync(publicDir));
  let promoted = 0;

  for (const name of readdirSync(webDir)) {
    if (!/^wedding\d+\.jpg$/i.test(name)) continue;
    const m = name.match(/^(wedding\d+)\.jpg$/i);
    if (!m) continue;
    const base = m[1];
    if (rootNames.has(`${base}.JPG`) || rootNames.has(`${base}.jpg`)) continue;

    const src = path.join(webDir, name);
    const destName = `${base}.jpg`;
    const dest = path.join(publicDir, destName);
    copyFileSync(src, dest);
    rootNames.add(destName);
    promoted += 1;
    console.log(`[promote-wedding-web] ${name} → public/${destName}`);
  }

  if (promoted > 0) {
    console.log(`[promote-wedding-web] ${promoted}개를 public 루트로 복사했습니다.`);
  }
}

main();
