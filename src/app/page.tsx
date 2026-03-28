import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { HomeHero } from "@/components/home-hero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeHero />

      <section className="border-t border-[color:var(--color-rose-pink)]/10 bg-[color:var(--color-light-pink)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
                The Mood
              </div>
              <h2 className="mt-4 text-3xl leading-[1.15] tracking-[0.02em] sm:text-4xl sm:tracking-[0.025em]">
                <span className="block whitespace-nowrap">가장 아름다워야 하는 순간을,</span>
                <span className="mt-3 block whitespace-nowrap">
                  {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}가장
                  아름다운 공간에서
                </span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-sm leading-7 text-[color:var(--color-muted)] sm:text-base sm:leading-8">
                고려시대 세 명의 성인이 풍류를 즐겼다 하여 이름 붙여진 삼성대.
                <br />
                이 아름다운 곳에 자리한 라마레에서 일생에서 가장 소중한 하루를
                기록하세요.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 md:auto-rows-fr">
            <PreviewCard
              title="Venue"
              description={
                <>
                  하늘과 바다 사이, 무한한 개방감이 선사하는
                  <br />
                  찬란한 축복의 공간
                </>
              }
              href="/venue"
            />
            <PreviewCard
              title="Dining"
              description="축복의 순간을 더욱더 완벽하게 만들어 드립니다."
              href="/dining"
            />
            <PreviewCard
              title="Location"
              description="바다위에 떠 있는 느낌의 유일한 웨딩 공간"
              href="/location"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}

function PreviewCard({
  title,
  description,
  href,
}: {
  title: string;
  description: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative h-full overflow-hidden rounded-3xl border border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-white)] p-6 shadow-sm transition hover:border-[color:var(--color-rose-pink)]/25 sm:p-7"
    >
      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[color:var(--color-rose-pink)]/20 blur-2xl transition group-hover:bg-[color:var(--color-rose-pink)]/30" />
      <div className="relative flex h-full min-h-[250px] flex-col">
        <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
          {title}
        </div>
        <div className="mt-4 font-serif text-[1.9rem] leading-[1.22] tracking-tight sm:text-[2rem]">
          {title === "Venue" ? (
            "빛과 수평선이 머무는 가장 높은 자리"
          ) : title === "Dining" ? (
            <>
              축복의 감사함을
              <br />
              정성으로 보답합니다.
            </>
          ) : (
            <>
              가장 아름다운
              <br />
              오션뷰를 가진 라마레
            </>
          )}
        </div>
        <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
          {description}
        </p>
        <div className="mt-auto pt-7 inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-[color:var(--color-foreground)]">
          Explore <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
