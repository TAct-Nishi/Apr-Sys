import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 認証トークン（例: cookie）を取得
  const token = request.cookies.get('token')?.value;

  // ログインしていない場合、/login へリダイレクト
  if (!token && request.nextUrl.pathname !== '/login') {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  // それ以外はそのまま
  return NextResponse.next();
}

// 適用するパスを指定（/login などは除外）
export const config = {
  matcher: [
    /*
      ここで保護したいパスを指定
      例: 全ページ保護（/login, /_next, /api などは除外）
    */
    '/((?!login|_next|api|favicon.ico).*)',
  ],
};
