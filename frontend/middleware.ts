import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 認証トークン（例: cookie）を取得
  const token = request.cookies.get('token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';

  // 未ログインで/login以外にアクセス → /loginへリダイレクト
  if (!token && !isLoginPage) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  // ログイン済みで/loginにアクセス → /へリダイレクト
  if (token && isLoginPage) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = '/';
    return NextResponse.redirect(homeUrl);
  }

  // それ以外はそのまま
  return NextResponse.next();
}

// 適用するパスを指定
export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico).*)',
  ],
};
