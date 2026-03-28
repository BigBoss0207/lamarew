import { Container } from "@/components/container";
import { HeroPhotoCarousel } from "@/components/hero-photo-carousel";
import { VenueGallery } from "@/components/venue-gallery";
import Link from "next/link";

export const metadata = {
  title: "Venue",
};

const venueGalleryItems = [
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
  { title: "루프탑 07", src: "/루프탑 (7).jpg" },
  { title: "루프탑 02", src: "/루프탑 (2).jpg" },
  { title: "루프탑 06", src: "/루프탑 (6).jpg" },
  { title: "루프탑 04", src: "/루프탑 (4).jpg" },
  { title: "루프탑 09", src: "/루프탑 (9).jpg" },
  { title: "루프탑 01", src: "/루프탑 (1).jpg" },
];

export default function VenuePage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="max-w-3xl lg:col-span-7">
            <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
              Venue
            </div>
            <h1 className="mt-4 text-4xl leading-[1.16] sm:text-5xl">
              하늘과 바다가 맞닿은
              <br />
              <span className="mt-2 inline-block pl-[9ch]">
                <span className="text-[color:var(--color-gold)]">라마레</span>만의 공간
              </span>
            </h1>
            <p className="mt-6 text-sm leading-7 text-[color:var(--color-muted)] sm:text-base sm:leading-8">
              3층 단독 홀의 프라이빗함 위에, 바다의 수평선이 배경이 됩니다.
              <br />
              화이트의 순수함과 골드의 절제된 포인트로, 사진보다 아름다운 공간을
              완성합니다.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] shadow-sm">
              <div className="relative aspect-[16/11] lg:h-full lg:aspect-auto">
                <HeroPhotoCarousel
                  className="absolute inset-0"
                  imageSrcList={["/ocean1.jpg", "/ocean8.jpg"]}
                  slideScale={1.42}
                  imageObjectPosition="65% center"
                  imageSizes="(max-width: 1024px) 100vw, 50vw"
                  imageQuality={92}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-ivory)]/30 via-transparent to-white/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] p-7 shadow-sm lg:col-span-5">
            <div className="text-base tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
              Private promise
            </div>
            <h2 className="mt-4 text-2xl leading-tight">
              30명부터 150명까지,
              <br />
              우리만의 프라이빗한 약속
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
              스몰 웨딩부터 하우스 웨딩까지,
              <br /> 인원과 취향에 맞춘 섬세한 동선과 연출을 제안합니다.
            </p>
            <div className="mt-7 grid grid-cols-2 auto-rows-fr gap-3 text-sm">
              <Stat value="Private 3F" />
              <Stat value="Exclusive Roof Top" />
              <Stat value="30–150 Guests" />
              <Stat
                value={
                  <>
                    Panorama
                    <br />
                    Ocean View
                  </>
                }
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] p-7 shadow-sm lg:col-span-7">
            <div className="mt-5 text-base tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
              Unique Value of Lamare
            </div>
            <div className="mt-5 space-y-6 text-sm leading-7 text-[color:var(--color-foreground)]/90">
              <div>
                <p className="font-medium text-[color:var(--color-foreground)]">
                  Elegant Tone | 화이트와 로즈 골드가 빚어낸 고귀한 조화
                </p>
                <p className="mt-2 text-[color:var(--color-muted)]">
                  절제된 화이트 톤과 은은한 로즈 골드 조명이 만나, 신부의 걸음마다
                  우아함을 더합니다.
                </p>
              </div>
              <div>
                <p className="font-medium text-[color:var(--color-foreground)]">
                  Exclusive | 오직 두 분만을 위한 프라이빗 단독 홀
                </p>
                <p className="mt-2 text-[color:var(--color-muted)]">
                  방해받지 않는 독립된 공간에서, 하객들과 깊게 교감하며 예식의
                  모든 순간에 온전히 몰입합니다.
                </p>
              </div>
              <div>
                <p className="font-medium text-[color:var(--color-foreground)]">
                  Timeless Light | 수평선의 빛으로 기록되는 시간의 깊이
                </p>
                <p className="mt-2 text-[color:var(--color-muted)]">
                  통창 가득 차오르는 오션뷰와 계절마다 결을 바꾸는 자연광이
                  <br />
                  두 분의 하루를 영원한 기억으로 채웁니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
                Gallery
              </div>
              <h2 className="mt-4 text-4xl leading-[1.12] tracking-[0.01em] sm:text-5xl">
                오직{" "}
                <span className="bg-brand-rose-gold bg-clip-text text-transparent font-serif text-[1.28em] font-semibold tracking-[0.01em] [text-shadow:0_1px_8px_rgba(212,181,168,0.28)]">
                  Lamare
                </span>
                에서만 가능한 공간
              </h2>
            </div>
            <Link
              href="/gallery"
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-[color:var(--color-rose-pink)]/30 bg-[color:var(--color-white)] px-5 py-2 text-xs tracking-[0.18em] uppercase text-[color:var(--color-foreground)] transition hover:bg-[color:var(--color-light-pink)]/55"
            >
              공간 갤러리 바로가기
            </Link>
          </div>

          <div className="mt-4 sm:hidden">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-rose-pink)]/30 bg-[color:var(--color-white)] px-5 py-2 text-xs tracking-[0.18em] uppercase text-[color:var(--color-foreground)] transition hover:bg-[color:var(--color-light-pink)]/55"
            >
              공간 갤러리 바로가기
            </Link>
          </div>

          <VenueGallery items={venueGalleryItems} />

          <div className="mt-8 flex justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-rose-pink)]/30 bg-[color:var(--color-white)] px-6 py-2.5 text-xs tracking-[0.18em] uppercase text-[color:var(--color-foreground)] transition hover:bg-[color:var(--color-light-pink)]/55"
            >
              공간 갤러리 바로가기
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Stat({ value }: { value: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[88px] items-center justify-center rounded-2xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-ivory)] px-4 py-3 text-center">
      <div className="font-serif text-lg leading-snug">{value}</div>
    </div>
  );
}

