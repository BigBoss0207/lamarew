"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

type GalleryItem = {
  title: string;
  src: string;
};

const defaultItems: GalleryItem[] = [
  { title: "Ocean View Hall", src: "/ocean1.jpg" },
  { title: "Panorama Window", src: "/ocean2.jpg" },
  { title: "Ceremony Aisle", src: "/ocean3.jpg" },
  { title: "Bride Room View", src: "/ocean4.jpg" },
  { title: "Golden Hour", src: "/ocean5.jpg" },
  { title: "Evening Atmosphere", src: "/ocean6.jpg" },
  { title: "Reception Flow", src: "/ocean7.jpg" },
  { title: "Private Lounge", src: "/ocean8.jpg" },
  { title: "Table Styling", src: "/ocean1.jpg" },
  { title: "Floral Moment", src: "/ocean2.jpg" },
  { title: "Signature Scene", src: "/ocean3.jpg" },
  { title: "Final Touch", src: "/ocean4.jpg" },
];

type Props = {
  items?: GalleryItem[];
};

export function VenueGallery({ items }: Props) {
  const galleryItems = useMemo(() => (items ? items : defaultItems), [items]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((v) =>
          v === null ? 0 : (v + 1) % galleryItems.length,
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((v) =>
          v === null
            ? 0
            : (v - 1 + galleryItems.length) % galleryItems.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryItems.length, selectedIndex]);

  return (
    <>
      {galleryItems.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] p-10 text-center shadow-sm">
          <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
            Gallery
          </div>
          <div className="mt-3 font-serif text-2xl text-[color:var(--color-foreground)]">
            곧 사진이 추가될 예정입니다
          </div>
          <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
            선택한 카테고리의 이미지는 추후 업로드 후 자동으로 반영됩니다.
          </p>
        </div>
      ) : null}

      {galleryItems.length > 0 ? (
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            className="group relative overflow-hidden rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] shadow-sm text-left"
            onClick={() => setSelectedIndex(index)}
            aria-label={`${item.title} 크게 보기`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        ))}
      </div>
      ) : null}

      {selectedIndex !== null ? (
        <div
          className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/30 text-white hover:bg-black/45 transition-colors"
              onClick={() => setSelectedIndex(null)}
              aria-label="닫기"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center p-4 sm:p-8">
            <div className="relative w-full overflow-hidden rounded-3xl border border-white/20 bg-black/20">
              <div className="relative aspect-[16/10]">
                <Image
                  src={galleryItems[selectedIndex].src}
                  alt={galleryItems[selectedIndex].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

