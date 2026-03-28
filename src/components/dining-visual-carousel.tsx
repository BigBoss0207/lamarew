"use client";

import { useEffect, useState } from "react";

import { publicFileUrl } from "@/lib/public-file-url";

type Slide = {
  src: string;
  alt: string;
  tag: "SHARE COURSE" | "CATERING";
};

const DEFAULT_SLIDES: Slide[] = [
  { src: "/쉐어코스 (7).JPG", alt: "쉐어 코스 다이닝 이미지", tag: "SHARE COURSE" },
  { src: "/쉐어코스 (3).JPG", alt: "쉐어 코스 다이닝 이미지", tag: "SHARE COURSE" },
  { src: "/케이터링1.JPG", alt: "케이터링 다이닝 이미지", tag: "CATERING" },
  { src: "/케이터링8.JPG", alt: "케이터링 다이닝 이미지", tag: "CATERING" },
];

type Props = {
  slides?: Slide[];
  intervalMs?: number;
};

function renderCommaBreak(text: string) {
  return text.split(",").map((chunk, idx, arr) => (
    <span key={`${chunk}-${idx}`}>
      {chunk.trim()}
      {idx < arr.length - 1 ? (
        <>
          ,
          <br />
        </>
      ) : null}
    </span>
  ));
}

export function DiningVisualCarousel({
  slides = DEFAULT_SLIDES,
  intervalMs = 4500,
}: Props) {
  const [index, setIndex] = useState(0);
  const descriptionByTag: Record<Slide["tag"], string> = {
    "SHARE COURSE":
      "공간의 분위기가 어우러지는 다이닝의 결을 담아, 테이블 위의 순간까지 정갈하게 완성합니다.",
    CATERING:
      "소중한 발걸음에 보답하는 사려 깊은 환대로, 눈으로 즐기고 마음으로 기억하는 디테일을 더합니다.",
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, slides.length]);

  const activeSlide = slides[index] ?? slides[0];

  return (
    <div className="overflow-hidden rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] shadow-sm lg:min-h-[520px]">
      <div className="relative aspect-[4/3]">
        <img
          key={activeSlide.src}
          src={publicFileUrl(activeSlide.src)}
          alt={activeSlide.alt}
          decoding="async"
          fetchPriority={index === 0 ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] tracking-[0.22em] text-[color:var(--color-foreground)]">
          {activeSlide.tag}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 pt-4 pb-3">
        {slides.map((slide, dotIndex) => (
          <button
            key={`${slide.src}-${dotIndex}`}
            type="button"
            aria-label={`${dotIndex + 1}번째 이미지 보기`}
            onClick={() => setIndex(dotIndex)}
            className={[
              "h-2.5 rounded-full transition-all",
              dotIndex === index
                ? "w-6 bg-[color:var(--color-rose-pink)]"
                : "w-2.5 bg-[color:var(--color-rose-pink)]/35 hover:bg-[color:var(--color-rose-pink)]/55",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="px-6 pb-6 text-center">
        <div className="text-xs tracking-[0.24em] uppercase text-[color:var(--color-muted)]">
          Visual
        </div>
        <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
          {renderCommaBreak(descriptionByTag[activeSlide.tag])}
        </p>
      </div>
    </div>
  );
}
