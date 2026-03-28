/**
 * public 폴더 정적 파일 URL. 경로 세그먼트마다 encodeURIComponent를 적용해
 * 한글·공백·괄호가 있어도 CDN/Workers 환경에서 요청이 일관되게 나가도록 합니다.
 */
export function publicFileUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  return `/${segments.map((s) => encodeURIComponent(s)).join("/")}`;
}
