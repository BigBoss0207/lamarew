"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  address: string;
  className?: string;
};

function loadNaverMaps(clientId: string) {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (window.naver?.maps) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-naver-maps="true"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("네이버 지도 스크립트 로드 실패")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.dataset.naverMaps = "true";
    script.async = true;
    script.defer = true;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${encodeURIComponent(
      clientId,
    )}&submodules=geocoder`;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("네이버 지도 스크립트 로드 실패")),
      { once: true },
    );
    document.head.appendChild(script);
  });
}

export function NaverMap({ address, className }: Props) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "ready" | "error" | "missing_key"
  >("idle");

  const fallbackCenter = useMemo(() => ({ lat: 35.26, lng: 129.23 }), []);

  useEffect(() => {
    let cancelled = false;
    if (!clientId) {
      setStatus("missing_key");
      return;
    }

    const el = mapElRef.current;
    if (!el) return;

    setStatus("loading");
    loadNaverMaps(clientId)
      .then(() => {
        if (cancelled) return;
        const naver = window.naver;
        if (!naver?.maps) throw new Error("네이버 지도 객체가 없습니다.");

        const map = new naver.maps.Map(el, {
          center: new naver.maps.LatLng(fallbackCenter.lat, fallbackCenter.lng),
          zoom: 14,
          minZoom: 10,
          zoomControl: true,
          zoomControlOptions: { position: naver.maps.Position.RIGHT_CENTER },
          scaleControl: false,
          mapDataControl: false,
          logoControl: true,
        });

        const marker = new naver.maps.Marker({
          map,
          position: map.getCenter(),
        });

        if (naver.maps.Service?.geocode) {
          naver.maps.Service.geocode({ query: address }, (err: any, res: any) => {
            if (cancelled) return;
            if (err || !res?.v2?.addresses?.length) {
              setStatus("ready");
              return;
            }
            const a = res.v2.addresses[0];
            const lat = Number(a.y);
            const lng = Number(a.x);
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
              setStatus("ready");
              return;
            }
            const latLng = new naver.maps.LatLng(lat, lng);
            map.setCenter(latLng);
            marker.setPosition(latLng);
            setStatus("ready");
          });
        } else {
          setStatus("ready");
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [address, clientId, fallbackCenter.lat, fallbackCenter.lng]);

  return (
    <div className={className}>
      <div
        ref={mapElRef}
        className="h-full w-full bg-[color:var(--color-white)]"
      />

      {status === "loading" ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-white/40 backdrop-blur-sm">
          <div className="rounded-full border border-[color:var(--color-rose-pink)]/25 bg-white/70 px-5 py-2 text-xs tracking-[0.24em] uppercase text-[color:var(--color-muted)]">
            지도 불러오는 중
          </div>
        </div>
      ) : null}

      {status === "missing_key" ? (
        <div className="absolute inset-0 grid place-items-center bg-white/70 p-6 text-center">
          <div className="max-w-sm rounded-3xl border border-[color:var(--color-rose-pink)]/20 bg-white px-6 py-5 shadow-sm">
            <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
              Naver Maps
            </div>
            <div className="mt-3 font-serif text-xl text-[color:var(--color-foreground)]">
              키 설정이 필요해요
            </div>
            <p className="mt-2 text-sm leading-7 text-[color:var(--color-muted)]">
              <span className="font-medium text-[color:var(--color-foreground)]">
                .env.local
              </span>
              에{" "}
              <span className="font-medium text-[color:var(--color-foreground)]">
                NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID
              </span>
              를 추가해 주세요.
            </p>
          </div>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="absolute inset-0 grid place-items-center bg-white/70 p-6 text-center">
          <div className="max-w-sm rounded-3xl border border-[color:var(--color-rose-pink)]/20 bg-white px-6 py-5 shadow-sm">
            <div className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-muted)]">
              Naver Maps
            </div>
            <div className="mt-3 font-serif text-xl text-[color:var(--color-foreground)]">
              지도를 불러오지 못했어요
            </div>
            <p className="mt-2 text-sm leading-7 text-[color:var(--color-muted)]">
              클라이언트 ID 또는 네트워크 상태를 확인해 주세요.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

