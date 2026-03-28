"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/container";
import { cn } from "@/lib/cn";

type NavItem = { href: string; label: string };

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems: NavItem[] = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/venue", label: "Venue" },
      { href: "/gallery", label: "Gallery" },
      { href: "/dining", label: "Dining" },
      { href: "/location", label: "Location" },
      { href: "/reservation", label: "Reservation" },
    ],
    [],
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Home hero is bright; keep header text dark for clarity.
  const onHeroDark = false;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isScrolled
          ? "border-b border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-ivory)]/95 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-ivory)]/80"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-3"
          aria-label="Lamare 홈"
        >
          <span className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <Image
              src="/lamarewedding_ui.png"
              alt="Lamare Wedding & Party 로고"
              fill
              sizes="128px"
              quality={95}
              className="object-contain p-0.5"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "font-serif text-[20px] tracking-[0.18em] transition-colors",
                onHeroDark ? "text-white" : "text-[color:var(--color-foreground)]",
              )}
            >
              Lamare
            </span>
            <span
              className={cn(
                "mt-1 text-[11px] tracking-[0.26em] transition-colors",
                onHeroDark
                  ? "text-white/70 group-hover:text-white"
                  : "text-[color:var(--color-muted)] group-hover:text-[color:var(--color-foreground)]",
              )}
            >
              Wedding &amp; Party · 라마레
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm tracking-[0.18em] uppercase transition-colors",
                onHeroDark
                  ? "text-white/80 hover:text-white"
                  : "text-zinc-700 hover:text-zinc-950",
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://open.kakao.com/o/spsZ1G4h"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center rounded-full px-5 py-2 text-xs tracking-[0.22em] uppercase transition-colors",
              onHeroDark
                ? "border border-white/40 text-white hover:bg-white/10"
                : "border border-[color:var(--color-gold)] text-[color:var(--color-foreground)] hover:bg-[color:var(--color-gold)]/10",
            )}
          >
            예약 문의
          </a>
        </nav>

        <button
          type="button"
          className={cn(
            "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors",
            onHeroDark
              ? "border-white/30 bg-white/10 text-white hover:bg-white/15"
              : "border-zinc-900/10 bg-white/70 text-zinc-900 hover:bg-white",
          )}
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {mobileOpen ? (
        <div className="md:hidden border-t border-[color:var(--color-rose-pink)]/15 bg-[color:var(--color-ivory)]/98 backdrop-blur">
          <Container className="py-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-sm tracking-[0.14em] uppercase text-zinc-800 hover:bg-[color:var(--color-rose-pink)]/10 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
