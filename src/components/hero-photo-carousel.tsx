"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  intervalMs?: number;
  fadeMs?: number;
  imageSrcList?: string[];
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  slideScale?: number;
  imageObjectPosition?: string;
  imageSizes?: string;
  imageQuality?: number;
  onSlideChange?: (nextIndex: number) => void;
};

export function HeroPhotoCarousel({
  className,
  intervalMs = 5000,
  fadeMs = 1400,
  imageSrcList,
  imageClassName,
  imageStyle,
  slideScale = 1,
  imageObjectPosition = "center",
  imageSizes = "(max-width: 768px) 100vw, 100vw",
  imageQuality = 90,
  onSlideChange,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  const images = useMemo(() => {
    const sources =
      imageSrcList && imageSrcList.length > 0
        ? imageSrcList
        : Array.from({ length: 8 }, (_, i) => `/ocean${i + 1}.jpg`);
    return sources.map((src, i) => ({
      src,
      alt: `Lamare 오션뷰 사진 ${i + 1}`,
    }));
  }, [imageSrcList]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((v) => {
        const next = (v + 1) % images.length;
        onSlideChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, onSlideChange, prefersReducedMotion]);

  const duration = prefersReducedMotion ? 0 : fadeMs / 1000;

  return (
    <motion.div
      className={["h-full w-full", className].filter(Boolean).join(" ")}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index]?.src}
            className="absolute inset-0"
            style={{ transform: `scale(${slideScale})`, transformOrigin: "center center" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: "easeOut" }}
          >
            <Image
              src={images[index]!.src}
              alt={images[index]!.alt}
              fill
              priority={index === 0}
              sizes={imageSizes}
              quality={imageQuality}
              className={["object-cover", imageClassName].filter(Boolean).join(" ")}
              style={{ objectPosition: imageObjectPosition, ...imageStyle }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

