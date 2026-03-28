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
    { title: "공간 10", src: "/venue1.JPG" },
    { title: "공간 11", src: "/venue2.JPG" },
    { title: "공간 12", src: "/venue3.JPG" },
    { title: "공간 13", src: "/venue4.JPG" },
    { title: "공간 14", src: "/venue5.JPG" },
    { title: "공간 15", src: "/venue6.JPG" },
    { title: "공간 16", src: "/venue7.JPG" },
    { title: "공간 17", src: "/venue8.JPG" },
    { title: "공간 18", src: "/venue9.JPG" },
    { title: "공간 19", src: "/rooftop1.jpg" },
    { title: "공간 20", src: "/rooftop2.jpg" },
    { title: "공간 21", src: "/rooftop3.jpg" },
    { title: "공간 22", src: "/rooftop4.jpg" },
    { title: "공간 23", src: "/rooftop5.jpg" },
    { title: "공간 24", src: "/rooftop6.jpg" },
    { title: "공간 25", src: "/rooftop7.jpg" },
    { title: "공간 26", src: "/rooftop8.jpg" },
    { title: "공간 27", src: "/rooftop9.jpg" },
    { title: "공간 28", src: "/rooftop9.jpg" },
  ],
  ceremony: [],
  dining: {
    catering: [
      { title: "드링크 01", src: "/drink1.JPG" },
      { title: "드링크 02", src: "/drink2.JPG" },
      { title: "드링크 03", src: "/drink3.JPG" },
      { title: "드링크 04", src: "/drink4.JPG" },
      { title: "드링크 05", src: "/drink5.JPG" },
      { title: "케이터링 01", src: "/catering1.JPG" },
      { title: "케이터링 02", src: "/catering2.JPG" },
      { title: "케이터링 03", src: "/catering3.JPG" },
      { title: "케이터링 04", src: "/catering4.JPG" },
      { title: "케이터링 05", src: "/catering5.JPG" },
      { title: "케이터링 06", src: "/catering6.JPG" },
      { title: "케이터링 07", src: "/catering7.JPG" },
      { title: "케이터링 08", src: "/catering8.JPG" },
      { title: "케이터링 09", src: "/catering9.JPG" },
      { title: "케이터링 10", src: "/catering10.JPG" },
      { title: "케이터링 11", src: "/catering11.JPG" },
      { title: "케이터링 12", src: "/catering12.JPG" },
      { title: "케이터링 13", src: "/catering13.JPG" },
      { title: "케이터링 14", src: "/catering14.JPG" },
      { title: "케이터링 15", src: "/catering15.JPG" },
      { title: "케이터링 16", src: "/catering16.JPG" },
      { title: "웰컴푸드 01", src: "/welcomefood1.JPG" },
      { title: "웰컴푸드 02", src: "/wellcomefood2.JPG" },
      { title: "웰컴푸드 03", src: "/wellcomefood3.JPG" },
      { title: "웰컴푸드 04", src: "/wellcomefood4.JPG" },
      { title: "웰컴푸드 05", src: "/wellcomefood5.JPG" },
      { title: "웰컴푸드 06", src: "/wellcomefood6.JPG" },
      { title: "웰컴푸드 07", src: "/wellcomefood7.JPG" },
      { title: "웰컴푸드 08", src: "/wellcomefood8.JPG" },
      { title: "웰컴푸드 09", src: "/wellcomefood9.JPG" },
      { title: "웰컴푸드 10", src: "/wellcomefood10.JPG" },
    ],
    "share-course": [
      { title: "쉐어 코스 01", src: "/sharecorse1.JPG" },
      { title: "쉐어 코스 02", src: "/sharecorse2.JPG" },
      { title: "쉐어 코스 03", src: "/sharecorse3.JPG" },
      { title: "쉐어 코스 04", src: "/sharecorse4.JPG" },
      { title: "쉐어 코스 05", src: "/sharecorse5.JPG" },
      { title: "쉐어 코스 06", src: "/sharecorse6.JPG" },
      { title: "쉐어 코스 07", src: "/sharecorse7.JPG" },
      { title: "쉐어 코스 08", src: "/sharecorse8.JPG" },
      { title: "쉐어 코스 09", src: "/sharecorse9.JPG" },
      { title: "쉐어 코스 10", src: "/sharecorse10.JPG" },
      { title: "쉐어 코스 11", src: "/sharecorse11.JPG" },
      { title: "쉐어 코스 12", src: "/sharecorse12.JPG" },
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

