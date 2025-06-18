"use client"

import { LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage = "" }: HeaderProps) {
  const navItems = [
    { href: "/", label: "HOME", key: "home" },
    { href: "/t-product-app", label: "申請内容", key: "applications" },
    { href: "/t-notifications", label: "お知らせの設定", key: "notifications" },
    { href: "/t-season-direction", label: "シーズンディレクション", key: "season-direction" },
    { href: "/t-brand-manual", label: "ブランドマニュアル", key: "brand-manual" },
    { href: "/t-account", label: "アカウント管理", key: "account" },
  ]
  {/* ログアウトのためのルーター */}
  const router = useRouter();

  // ログアウト処理
  const handleLogout = async () => {
    // localStorageのtoken削除
    localStorage.removeItem("token");
    // サーバーにログアウトリクエスト
    await fetch("/api/logout", { method: "POST" });
    // /loginへ遷移
    router.push("/login");
  };

  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-blue-600">LOGO</div>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={
                  currentPage === item.key
                    ? "bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">田中太郎</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            ログアウト
          </Button>
        </div>
      </div>
    </header>
  )
}
