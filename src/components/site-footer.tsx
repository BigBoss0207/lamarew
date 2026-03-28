import Image from "next/image";
import Link from "next/link";
import { Camera, MapPin, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/container";
import { FooterAddressCopy } from "@/components/footer-address-copy";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[color:var(--color-rose-pink)] text-white">
      <Container className="py-6 sm:py-7">
        <div className="grid gap-7 md:grid-cols-3 md:items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="relative h-12 w-12 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/10">
                <Image
                  src="/lamarewedding_ui.png"
                  alt="Lamare Wedding & Party 로고"
                  fill
                  sizes="128px"
                  quality={95}
                  className="object-contain p-1"
                />
              </span>
              <div>
                <div className="font-serif text-lg tracking-[0.16em]">
                  Lamare
                </div>
                <div className="mt-0.5 text-[10px] tracking-[0.24em] text-white/75">
                  Wedding &amp; Party
                </div>
              </div>
            </div>
            <p className="text-sm leading-6 text-white/85 md:max-w-[30ch]">
              일광 해수욕장 오션뷰, 라마레만의 공간.
              <br />
              커스터마이징 프라이빗 하우스 웨딩.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs tracking-[0.22em] uppercase text-white/70">
              Contact
            </div>
            <ul className="space-y-2.5 text-sm text-white/90">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-white/60" />
                <FooterAddressCopy address="부산광역시 기장군 기장해안로 1294" />
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-white/60" />
                <a
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  href="tel:+82517154333"
                  aria-label="라마레 전화 걸기"
                >
                  051-715-4333
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs tracking-[0.22em] uppercase text-white/70">
              Social
            </div>
            <div className="flex items-center gap-2.5">
              <Link
                href="https://www.instagram.com/_u/lamarewedding/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Camera size={16} />
              </Link>
              <Link
                href="https://open.kakao.com/o/spsZ1G4h"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="KakaoTalk"
              >
                <MessageCircle size={16} />
              </Link>
              <Link
                href="https://blog.naver.com/lamare1294"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Naver Blog"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-white/45 bg-white/10 text-[11px] font-semibold leading-none text-white">
                  b
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/20 pt-3 text-center">
          <p className="text-xs leading-6 text-white/70">
            © {new Date().getFullYear()} Lamare. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
