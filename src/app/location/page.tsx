import Link from "next/link";
import { Car, ExternalLink, MapPin, Train } from "lucide-react";

import { Container } from "@/components/container";
import { publicFileUrl } from "@/lib/public-file-url";

export const metadata = {
  title: "Location",
};

export default function LocationPage() {
  const address = "부산광역시 기장군 기장해안로 1294";
  const mapLink = "https://naver.me/IGZPB5Ob";
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
            Location
          </div>
          <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl">
            일광해수욕장과 맞닿은 곳,
            <br />
            <span className="text-5xl font-semibold text-[color:var(--color-rose-pink)] sm:text-6xl">
              Lamare
            </span>
          </h1>
          <p className="mt-6 text-sm leading-7 text-[color:var(--color-muted)] sm:text-base sm:leading-8">
            바다를 향해 열려있는 공간. 도착순간부터 라마레만의 아름다움에 빠져
            듭니다.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] shadow-sm">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/8]">
            <img
              src={publicFileUrl("/location.jpg")}
              alt="라마레 로케이션 전경"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover scale-[1.06]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-black/5" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-[color:var(--color-rose-pink)]/15 p-5">
                <div className="flex items-center gap-2 text-sm text-[color:var(--color-foreground)]/90">
                  <MapPin size={16} className="text-[color:var(--color-muted)]" />
                  <span>{address}</span>
                </div>
                <div className="hidden text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)] sm:block">
                  Map
                </div>
              </div>
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] bg-white">
                <Link
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group absolute inset-0"
                  aria-label="네이버 지도에서 열기"
                >
                  <img
                    src={publicFileUrl("/naver-map-preview-landscape.png")}
                    alt="라마레 위치 지도 미리보기"
                    decoding="async"
                    fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/45 via-white/0 to-white/10" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
                  <div className="absolute bottom-4 right-4 rounded-full bg-white/85 px-4 py-2 text-xs tracking-[0.22em] uppercase text-[color:var(--color-foreground)] shadow-sm backdrop-blur">
                    Naver Map <ExternalLink className="ml-2 inline-block" size={14} />
                  </div>
                </Link>
              </div>
              <div className="p-7">
                <p className="text-sm leading-7 text-[color:var(--color-muted)]">
                  도착하는 순간, 라마레만의 바이브가 시작됩니다. 길찾기와 주차 안내는 아래
                  버튼에서 확인하실 수 있어요.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-rose-pink)]/20 bg-[color:var(--color-white)] px-6 py-3 text-xs tracking-[0.24em] uppercase text-[color:var(--color-foreground)] hover:bg-[color:var(--color-light-pink)]/40 transition-colors"
                  >
                    네이버 지도 <ExternalLink size={14} />
                  </Link>
                  <Link
                    href={`https://map.kakao.com/link/search/${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-rose-pink)]/20 bg-[color:var(--color-white)] px-6 py-3 text-xs tracking-[0.24em] uppercase text-[color:var(--color-foreground)] hover:bg-[color:var(--color-light-pink)]/40 transition-colors"
                  >
                    카카오 지도 <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] p-7 shadow-sm">
              <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
                Parking
              </div>
              <div className="mt-4 flex items-start gap-3">
                <Car size={18} className="mt-1 text-[color:var(--color-rose-pink)]" />
                <div>
                  <div className="font-serif text-2xl">주차 안내</div>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
                    예식 당일 혼잡을 줄이기 위해,
                    <br />
                    라마레 제 2주차장을 이용해 주세요.
                  </p>

                  <div className="mx-auto mt-5 w-full max-w-[340px] rounded-2xl border border-[color:var(--color-rose-pink)]/25 bg-[color:var(--color-light-pink)]/50 px-4 py-3.5">
                    <div className="flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-[color:var(--color-foreground)]">
                      <Train size={14} className="text-[color:var(--color-rose-pink)]" />
                      <span>From Ilgwang Station</span>
                    </div>
                    <div className="mt-3 grid gap-3 text-xs text-[color:var(--color-muted)] sm:grid-cols-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                          Distance
                        </div>
                        <div className="mt-1.5 font-medium text-[color:var(--color-foreground)]">
                          약 932m
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                          Taxi
                        </div>
                        <div className="mt-1.5 text-[color:var(--color-foreground)]">
                          약 4,800원
                          <br />
                          2분 소요
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                          Walk
                        </div>
                        <div className="mt-1.5 text-[color:var(--color-foreground)]">
                          도보 약 15분
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

