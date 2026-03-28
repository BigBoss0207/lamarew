import Link from "next/link";
import { Container } from "@/components/container";
import { DiningVisualCarousel } from "@/components/dining-visual-carousel";

export const metadata = {
  title: "Dining",
};

const items = [
  {
    title: "Luxury Course",
    subtitle: "계절을 담은 식재료와 섬세한 플레이팅",
    body: "보내주신 축복에 보답할 수 있도록, 예식의 흐름에 맞춰 가장 완벽한 쉐어 코스를 선물합니다.",
  },
  {
    title: "Signature Buffet",
    subtitle: "취향을 존중하는 다채로운 선택",
    body: "메인, 셀러드, 디저트까지 깔끔한 동선과 큐레이션으로<br> '분주함'대신 '여유'를 남깁니다.",
  },
  {
    title: "SENSORY CATERING",
    subtitle: "소중한 발걸음에 보답하는 사려 깊은 환대",
    body: "눈으로 즐기고 마음으로 기억하는, 하객들을 위한 라마레의 정성입니다",
  },
];

const galleryButtonByTitle: Record<
  string,
  { href: string; label: string }
> = {
  "Luxury Course": {
    href: "/gallery?category=dining&dining=share-course",
    label: "쉐어코스 갤러리 바로가기",
  },
  "Signature Buffet": {
    href: "/gallery?category=dining&dining=buffet",
    label: "뷔페 갤러리 바로가기",
  },
  "SENSORY CATERING": {
    href: "/gallery?category=dining&dining=catering",
    label: "케이터링 갤러리 바로가기",
  },
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

export default function DiningPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
            Dining
          </div>
          <h1 className="mt-4 text-4xl leading-[1.16] tracking-[0.02em] sm:text-5xl sm:tracking-[0.03em]">
            최상의 다이닝으로
            <br />
            보내주신 축복에 보답합니다.
          </h1>
          <p className="mt-6 text-sm leading-7 text-[color:var(--color-muted)] sm:text-base sm:leading-8">
            {renderCommaBreak(
              "럭셔리한 코스 또는 뷔페. 정갈한 구성과 우아한 디테일로, 축하의 순간에 어울리는 한 끼를 완성합니다.",
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <DiningVisualCarousel />
          </div>

          <div className="lg:col-span-6">
            <div className="grid gap-4">
              {items.map((item) => (
                <div
                  key={item.title}
                  className={[
                    "rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] py-6 shadow-sm",
                    item.title === "SENSORY CATERING" ? "px-6" : "px-7",
                  ].join(" ")}
                >
                  <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
                    {item.title}
                  </div>
                  <h2
                    className={[
                      "mt-4 text-2xl leading-tight",
                      item.title === "SENSORY CATERING" ? "tracking-[-0.005em]" : "",
                    ].join(" ")}
                  >
                    {item.subtitle}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
                    {item.body.split("<br>").map((line, idx) => (
                      <span key={`${item.title}-${idx}`}>
                        {item.title === "Signature Buffet"
                          ? line
                          : renderCommaBreak(line)}
                        {idx < item.body.split("<br>").length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </p>
                  <div className="mt-5 h-px w-16 bg-[linear-gradient(90deg,var(--rose-gold-from),var(--rose-gold-to))] opacity-80" />
                  {galleryButtonByTitle[item.title] ? (
                    <div className="mt-6 flex justify-end">
                      <Link
                        href={galleryButtonByTitle[item.title].href}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[color:var(--color-rose-pink)]/30 bg-[color:var(--color-white)] px-4 py-2 text-[11px] tracking-[0.14em] uppercase text-[color:var(--color-foreground)] transition hover:bg-[color:var(--color-light-pink)]/55"
                      >
                        {galleryButtonByTitle[item.title].label}
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}

