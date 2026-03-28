/**
 * public 정적 파일용 URL. 한글 파일명은 퍼센트 인코딩하지 않고 그대로 둡니다.
 * (브라우저가 요청 시 UTF-8로 인코딩하며, Cloudflare Pages 정적 자산 키와 맞추기 쉬움.
 * encodeURIComponent만 쓰면 산출물 경로와 달라 404가 나는 경우가 있습니다.)
 */
export function publicFileUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  return `/${segments.join("/")}`;
}
