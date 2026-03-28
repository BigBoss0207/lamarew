"use client";

import { useMemo, useState } from "react";

import { VenueGallery } from "@/components/venue-gallery";
import { cn } from "@/lib/cn";

type TopCategory = "space" | "ceremony" | "dining";
type DiningCategory = "catering" | "share-course" | "buffet";

type GalleryItem = {
  title: string;
  src: string;
};

type Props = {
  ceremonyItems?: GalleryItem[];
  initialTopCategory?: TopCategory;
  initialDiningCategory?: DiningCategory;
};

const DATA: Record<
  TopCategory,
  GalleryItem[] | Record<DiningCategory, GalleryItem[]>
> = {
  space: [
    { title: "공간 02", src: "/ocean2.jpg" },
    { title: "공간 03", src: "/ocean3.jpg" },
    { title: "공간 04", src: "/ocean4.jpg" },
    { title: "공간 05", src: "/ocean5.jpg" },
    { title: "공간 06", src: "/ocean6.jpg" },
    { title: "공간 07", src: "/ocean7.jpg" },
    { title: "공간 08", src: "/ocean8.jpg" },
    { title: "공간 09", src: "/ocean9.jpg" },
    { title: "공간 10", src: "/베누1.JPG" },
    { title: "공간 11", src: "/베누2.JPG" },
    { title: "공간 12", src: "/베누3.JPG" },
    { title: "공간 13", src: "/베누4.JPG" },
    { title: "공간 14", src: "/베누5.JPG" },
    { title: "공간 15", src: "/베누6.JPG" },
    { title: "공간 16", src: "/베누7.JPG" },
    { title: "공간 17", src: "/베누8.JPG" },
    { title: "공간 18", src: "/베누9.JPG" },
    { title: "공간 19", src: "/루프탑 (1).jpg" },
    { title: "공간 20", src: "/루프탑 (2).jpg" },
    { title: "공간 21", src: "/루프탑 (3).jpg" },
    { title: "공간 22", src: "/루프탑 (4).jpg" },
    { title: "공간 23", src: "/루프탑 (5).jpg" },
    { title: "공간 24", src: "/루프탑 (6).jpg" },
    { title: "공간 25", src: "/루프탑 (7).jpg" },
    { title: "공간 26", src: "/루프탑 (8).jpg" },
    { title: "공간 27", src: "/루프탑 (9).jpg" },
    { title: "공간 28", src: "/루프탑 (10).jpg" },
  ],
  ceremony: [],
  dining: {
    catering: [
      { title: "드링크 01", src: "/드링크 (1).JPG" },
      { title: "드링크 02", src: "/드링크 (2).JPG" },
      { title: "드링크 03", src: "/드링크 (3).JPG" },
      { title: "드링크 04", src: "/드링크 (4).JPG" },
      { title: "드링크 05", src: "/드링크 (5).JPG" },
      { title: "케이터링 01", src: "/케이터링1.JPG" },
      { title: "케이터링 02", src: "/케이터링2.JPG" },
      { title: "케이터링 03", src: "/케이터링3.JPG" },
      { title: "케이터링 04", src: "/케이터링4.JPG" },
      { title: "케이터링 05", src: "/케이터링5.JPG" },
      { title: "케이터링 06", src: "/케이터링6.JPG" },
      { title: "케이터링 07", src: "/케이터링7.JPG" },
      { title: "케이터링 08", src: "/케이터링8.JPG" },
      { title: "케이터링 09", src: "/케이터링9.JPG" },
      { title: "케이터링 10", src: "/케이터링10.JPG" },
      { title: "케이터링 11", src: "/케이터링11.JPG" },
      { title: "케이터링 12", src: "/케이터링12.JPG" },
      { title: "케이터링 13", src: "/케이터링13.JPG" },
      { title: "케이터링 14", src: "/케이터링14.JPG" },
      { title: "케이터링 15", src: "/케이터링15.JPG" },
      { title: "케이터링 16", src: "/케이터링16.JPG" },
      { title: "웰컴푸드 01", src: "/웰컴푸드 (1).JPG" },
      { title: "웰컴푸드 02", src: "/웰컴푸드 (2).JPG" },
      { title: "웰컴푸드 03", src: "/웰컴푸드 (3).JPG" },
      { title: "웰컴푸드 04", src: "/웰컴푸드 (4).JPG" },
      { title: "웰컴푸드 05", src: "/웰컴푸드 (5).JPG" },
      { title: "웰컴푸드 06", src: "/웰컴푸드 (6).JPG" },
      { title: "웰컴푸드 07", src: "/웰컴푸드 (7).JPG" },
      { title: "웰컴푸드 08", src: "/웰컴푸드 (8).JPG" },
      { title: "웰컴푸드 09", src: "/웰컴푸드 (9).JPG" },
      { title: "웰컴푸드 10", src: "/웰컴푸드 (10).JPG" },
    ],
    "share-course": [
      { title: "쉐어 코스 01", src: "/쉐어코스 (1).JPG" },
      { title: "쉐어 코스 02", src: "/쉐어코스 (2).JPG" },
      { title: "쉐어 코스 03", src: "/쉐어코스 (3).JPG" },
      { title: "쉐어 코스 04", src: "/쉐어코스 (4).JPG" },
      { title: "쉐어 코스 05", src: "/쉐어코스 (5).JPG" },
      { title: "쉐어 코스 06", src: "/쉐어코스 (6).JPG" },
      { title: "쉐어 코스 07", src: "/쉐어코스 (7).JPG" },
      { title: "쉐어 코스 08", src: "/쉐어코스 (8).JPG" },
      { title: "쉐어 코스 09", src: "/쉐어코스 (9).JPG" },
      { title: "쉐어 코스 10", src: "/쉐어코스 (10).JPG" },
      { title: "쉐어 코스 11", src: "/쉐어코스 (11).JPG" },
      { title: "쉐어 코스 12", src: "/쉐어코스 (12).JPG" },
    ],
    buffet: [],
  },
};

export function GalleryCategorized({
  ceremonyItems,
  initialTopCategory = "space",
  initialDiningCategory = "catering",
}: Props) {
  const [topCategory, setTopCategory] = useState<TopCategory>(initialTopCategory);
  const [diningCategory, setDiningCategory] = useState<DiningCategory>(
    initialDiningCategory,
  );
  const [page, setPage] = useState(1);

  const itemsPerPage = 24;

  const data = useMemo(() => {
    return {
      ...DATA,
      ceremony: ceremonyItems ?? DATA.ceremony,
    };
  }, [ceremonyItems]);

  const items = useMemo(() => {
    if (topCategory !== "dining") {
      return data[topCategory] as GalleryItem[];
    }
    const dining = data.dining as Record<DiningCategory, GalleryItem[]>;
    return dining[diningCategory];
  }, [data, topCategory, diningCategory]);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const pagedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, page]);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2">
        <CategoryButton
          active={topCategory === "space"}
          onClick={() => {
            setTopCategory("space");
            setPage(1);
          }}
        >
          공간
        </CategoryButton>
        <CategoryButton
          active={topCategory === "ceremony"}
          onClick={() => {
            setTopCategory("ceremony");
            setPage(1);
          }}
        >
          예식
        </CategoryButton>
        <CategoryButton
          active={topCategory === "dining"}
          onClick={() => {
            setTopCategory("dining");
            setPage(1);
          }}
        >
          다이닝
        </CategoryButton>
      </div>

      {topCategory === "dining" ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <CategoryButton
            size="sm"
            active={diningCategory === "catering"}
            onClick={() => {
              setDiningCategory("catering");
              setPage(1);
            }}
          >
            케이터링
          </CategoryButton>
          <CategoryButton
            size="sm"
            active={diningCategory === "share-course"}
            onClick={() => {
              setDiningCategory("share-course");
              setPage(1);
            }}
          >
            쉐어 코스
          </CategoryButton>
          <CategoryButton
            size="sm"
            active={diningCategory === "buffet"}
            onClick={() => {
              setDiningCategory("buffet");
              setPage(1);
            }}
          >
            뷔페
          </CategoryButton>
        </div>
      ) : null}

      <div className="mt-6 text-sm text-[color:var(--color-muted)]">
        총 <span className="font-semibold text-[color:var(--color-foreground)]">{items.length}</span>장
      </div>

      <VenueGallery items={pagedItems} />

      {items.length > itemsPerPage ? (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-full border border-[color:var(--color-rose-pink)]/25 bg-white px-4 py-2 text-sm text-[color:var(--color-foreground)] transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[color:var(--color-light-pink)]/45"
          >
            이전
          </button>
          <div className="text-sm text-[color:var(--color-muted)]">
            {page} / {totalPages}
          </div>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-full border border-[color:var(--color-rose-pink)]/25 bg-white px-4 py-2 text-sm text-[color:var(--color-foreground)] transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[color:var(--color-light-pink)]/45"
          >
            다음
          </button>
        </div>
      ) : null}
    </div>
  );
}

function CategoryButton({
  active,
  onClick,
  children,
  size = "md",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  size?: "md" | "sm";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border transition-colors",
        size === "md" ? "px-5 py-2.5 text-sm" : "px-4 py-2 text-xs",
        active
          ? "border-[color:var(--color-rose-pink)]/40 bg-[color:var(--color-light-pink)] text-[color:var(--color-foreground)]"
          : "border-[color:var(--color-rose-pink)]/20 bg-white text-[color:var(--color-muted)] hover:bg-[color:var(--color-light-pink)]/45",
      )}
    >
      {children}
    </button>
  );
}

