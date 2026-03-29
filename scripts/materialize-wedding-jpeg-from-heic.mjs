import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const outDir = path.join(publicDir, "wedding-web");

/**
 * weddingN.HEIC 만 있고 JPG가 없을 때 wedding-web/weddingN.jpg 로 변환.
 * 브라우저는 HEIC를 img로 못 그립니다. sharp는 Windows 등에서 HEIC 코덱이
 * 빠진 빌드가 많아, 실패 시 heic-convert(WASM)로 폴백합니다.
 */
async function convertHeicToJpeg(inPath, outPath) {
  const inputBuffer = readFileSync(inPath);

  try {
    const sharp = (await import("sharp")).default;
    await sharp(inputBuffer)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath);
    return "sharp";
  } catch {
    // libvips HEIC 미지원 플랫폼에서 흔함
  }

  try {
    const convert = (await import("heic-convert")).default;
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.88,
    });
    writeFileSync(outPath, Buffer.from(outputBuffer));
    return "heic-convert";
  } catch (err) {
    console.warn(
      `[materialize-heic] 실패 ${path.basename(inPath)}:`,
      err?.message ?? err,
    );
    return null;
  }
}

async function main() {
  if (!existsSync(publicDir)) return;

  const names = readdirSync(publicDir);
  const set = new Set(names);
  const heicFiles = names.filter(
    (n) => /^wedding\d+\./i.test(n) && /\.heic$/i.test(n),
  );

  if (heicFiles.length === 0) {
    console.log("[materialize-heic] HEIC 없음, 스킵");
    return;
  }

  mkdirSync(outDir, { recursive: true });

  let ok = 0;
  let skippedFresh = 0;
  for (const heicName of heicFiles) {
    const m = heicName.match(/^(wedding\d+)\./i);
    if (!m) continue;
    const base = m[1];
    if (set.has(`${base}.JPG`) || set.has(`${base}.jpg`)) continue;

    const outName = `${base}.jpg`;
    const outPath = path.join(outDir, outName);
    const inPath = path.join(publicDir, heicName);

    if (existsSync(outPath)) {
      const inStat = statSync(inPath);
      const outStat = statSync(outPath);
      if (outStat.mtimeMs >= inStat.mtimeMs) {
        skippedFresh += 1;
        continue;
      }
    }

    const via = await convertHeicToJpeg(inPath, outPath);
    if (via) {
      console.log(`[materialize-heic] ${heicName} → wedding-web/${outName} (${via})`);
      ok += 1;
    }
  }

  const skippedRootJpg = heicFiles.length - heicFiles.filter((n) => {
    const b = n.match(/^(wedding\d+)\./i)?.[1];
    return b && !set.has(`${b}.JPG`) && !set.has(`${b}.jpg`);
  }).length;
  console.log(
    `[materialize-heic] 완료: ${ok}개 변환, ${skippedFresh}개 캐시 유지` +
      (skippedRootJpg ? `, 루트에 JPG 있어 스킵 ${skippedRootJpg}개` : ""),
  );
}

main();
