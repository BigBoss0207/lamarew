import sharp from "sharp";
import { fileURLToPath } from "node:url";

const input = new URL("../public/lamarewedding_logo.png", import.meta.url);
const output = new URL(
  "../public/lamarewedding_logo_cropped.png",
  import.meta.url,
);

const inputPath = fileURLToPath(input);
const outputPath = fileURLToPath(output);

// The provided PNG includes a large black canvas around the actual logo.
// Instead of relying on trim (which can fail with compression/gradients),
// crop a centered square that fits the logo area.
const meta = await sharp(inputPath).metadata();
if (!meta.width || !meta.height) throw new Error("Missing metadata");

const size = Math.min(900, meta.width, meta.height);
const left = Math.max(0, Math.floor((meta.width - size) / 2));
const top = Math.max(0, Math.floor((meta.height - size) / 2));

await sharp(inputPath)
  .extract({ left, top, width: size, height: size })
  .png()
  .toFile(outputPath);

console.log("Wrote:", output.pathname);

