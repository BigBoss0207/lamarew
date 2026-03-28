import { Container } from "@/components/container";

const NAVER_RESERVATION_URL =
  "https://map.naver.com/p/entry/place/2028404093?placePath=/ticket";

export default function ReservationPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
            Reservation
          </div>
          <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl">
            네이버 예약
            <br />
            간편하게, 빠르게
          </h1>
          <p className="mt-6 text-sm leading-7 text-[color:var(--color-muted)] sm:text-base sm:leading-8">
            라마레 네이버 플레이스 예약 페이지를
            <br />
            홈페이지 안에서 바로 확인하실 수 있습니다.
          </p>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] shadow-sm">
            <iframe
              src={NAVER_RESERVATION_URL}
              title="Lamare Naver Reservation"
              className="h-[76vh] min-h-[560px] w-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] p-5 text-sm leading-7 text-[color:var(--color-muted)]">
            <p>
              일부 환경에서는 네이버 정책으로 인해 예약 화면이 보이지 않을 수 있습니다.
            </p>
            <a
              href={NAVER_RESERVATION_URL}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-rose-gold px-6 py-2.5 text-xs tracking-[0.22em] uppercase text-white transition hover:brightness-95"
            >
              네이버 예약 페이지 열기
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

