"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

import { Container } from "@/components/container";
import { HeroPhotoCarousel } from "@/components/hero-photo-carousel";

const HERO_INTERVAL_MS = 5000;
const HERO_FADE_MS = 1400;
const HERO_FRAME_FADE_MS = 4200;

export function HomeHero() {
  const frameControls = useAnimation();

  const handleSlideChange = () => {
    frameControls.start({
      opacity: [1, 0.2, 0.2, 1],
      transition: {
        duration: HERO_FRAME_FADE_MS / 1000,
        ease: "linear",
        // 사라진 상태를 약 0.2초 유지한 뒤 복귀 시작.
        times: [0, 0.1, 0.15, 1],
      },
    });
  };

  return (
    <section className="relative min-h-[calc(90vh-4rem)] overflow-hidden sm:min-h-[calc(88vh-4rem)]">
      <HeroPhotoCarousel
        className="absolute inset-0 z-0"
        imageClassName="scale-[1.08] sm:scale-[1.06]"
        imageSizes="100vw"
        imageQuality={95}
        intervalMs={HERO_INTERVAL_MS}
        fadeMs={HERO_FADE_MS}
        onSlideChange={handleSlideChange}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/45 via-black/15 to-black/10" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

      <Container className="relative z-20 flex min-h-[calc(90vh-4rem)] items-center pt-14 pb-10 sm:min-h-[calc(88vh-4rem)] sm:pt-18 sm:pb-14">
        <motion.div
          initial={{ opacity: 1 }}
          animate={frameControls}
          className="max-w-2xl rounded-3xl border border-white/20 bg-black/20 p-6 backdrop-blur-[2px] sm:p-8"
        >
          <div className="text-xs tracking-[0.28em] uppercase text-white/80">
            Luxury House Wedding Hall · Ocean View
          </div>
          <h1 className="mt-5 text-4xl leading-[1.08] tracking-tight text-white sm:text-6xl">
            <span className="whitespace-nowrap">하늘과 바다가 맞닿는</span>{" "}
            <span className="font-semibold text-[color:var(--color-rose-gold-from)] [text-shadow:0_2px_10px_rgba(0,0,0,0.38)]">
              Lamare
            </span>
          </h1>
          <p className="mt-6 text-base leading-8 text-white/85 sm:text-lg">
            &ldquo;창밖의 수평선이 두 분이 영원할 것이라는 증명이 되고,
            <br />
            쏟아지는 빛은 오직 두 사람의 미래를 밝힙니다.&rdquo;
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="https://open.kakao.com/o/spsZ1G4h"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brand-rose-gold px-6 py-3 text-sm tracking-[0.18em] uppercase text-white shadow-sm transition hover:brightness-95"
            >
              예약 문의
            </a>
            <Link
              href="/venue"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm tracking-[0.18em] uppercase text-white transition hover:bg-white/20"
            >
              Venue 보기 <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
