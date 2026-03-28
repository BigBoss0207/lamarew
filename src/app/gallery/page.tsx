import { readdir } from "node:fs/promises";
import path from "node:path";

import { Container } from "@/components/container";
import { GalleryCategorized } from "@/components/gallery-categorized";

export const metadata = {
  title: "Gallery",
};

type GalleryItem = {
  title: string;
  src: string;
};

type TopCategory = "space" | "ceremony" | "dining";
type DiningCategory = "catering" | "share-course" | "buffet";

type SearchParams = {
  category?: string;
  dining?: string;
};

function getOrderFromName(name: string) {
  const m = name.match(/\((\d+)\)/);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
}

async function getCeremonyItems(): Promise<GalleryItem[]> {
  const publicDir = path.join(process.cwd(), "public");
  const files = await readdir(publicDir);
  const imageExt = /\.(jpg|jpeg|png|webp|gif)$/i;

  const ceremonyFiles = files
    .filter((name) => name.includes("예식") && imageExt.test(name))
    .sort((a, b) => getOrderFromName(a) - getOrderFromName(b));

  return ceremonyFiles.map((name, i) => ({
    title: `예식 ${String(i + 1).padStart(2, "0")}`,
    src: `/${encodeURIComponent(name)}`,
  }));
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const normalizeTopCategory = (value?: string): TopCategory => {
    if (value === "ceremony" || value === "dining" || value === "space") {
      return value;
    }
    return "space";
  };

  const normalizeDiningCategory = (value?: string): DiningCategory => {
    if (value === "share-course" || value === "buffet" || value === "catering") {
      return value;
    }
    return "catering";
  };
  const params = await searchParams;
  const initialTopCategory = normalizeTopCategory(params.category);
  const initialDiningCategory = normalizeDiningCategory(params.dining);
  const ceremonyItems = await getCeremonyItems();

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
            Gallery
          </div>
          <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl">
            오직{" "}
            <span className="bg-brand-rose-gold bg-clip-text text-transparent font-serif">
              Lamare
            </span>
            에서만 가능한 공간
          </h1>
          <p className="mt-6 text-sm leading-7 text-[color:var(--color-muted)] sm:text-base sm:leading-8">
            빛과 여백, 그리고 바다가 만나는 순간들.
            <br />
            사진 위에 커서를 올리면 확대되고, 클릭하면 크게 볼 수 있습니다.
          </p>
        </div>

        <GalleryCategorized
          ceremonyItems={ceremonyItems}
          initialTopCategory={initialTopCategory}
          initialDiningCategory={initialDiningCategory}
        />
      </Container>
    </div>
  );
}

