"use client"

import { useState } from "react"
import { Plus, Edit, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Header from "@/components/header"

export default function NotificationsSettings() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 8

  // サンプルデータ
  const notifications = [
    {
      id: 1,
      date: "2024-01-20",
      title: "システムメンテナンスのお知らせ",
    },
    {
      id: 2,
      date: "2024-01-18",
      title: "新機能リリースについて",
    },
    {
      id: 3,
      date: "2024-01-15",
      title: "年末年始の営業時間変更のお知らせ",
    },
    {
      id: 4,
      date: "2024-01-12",
      title: "セキュリティアップデートのご案内",
    },
    {
      id: 5,
      date: "2024-01-10",
      title: "利用規約改定のお知らせ",
    },
    {
      id: 6,
      date: "2024-01-08",
      title: "サーバー移行作業完了のご報告",
    },
    {
      id: 7,
      date: "2024-01-05",
      title: "新年のご挨拶",
    },
    {
      id: 8,
      date: "2024-01-03",
      title: "年始営業開始のお知らせ",
    },
    {
      id: 9,
      date: "2023-12-28",
      title: "年末年始休業のお知らせ",
    },
    {
      id: 10,
      date: "2023-12-25",
      title: "クリスマスキャンペーンのお知らせ",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="notifications" />

      {/* メインコンテンツ */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">お知らせの設定</h1>

          {/* 新規追加ボタン */}
          <div className="mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              新規お知らせ追加
            </Button>
          </div>

          {/* お知らせ一覧 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">お知らせ一覧</h2>
              <p className="text-sm text-gray-600 mt-1">全 78 件中 1-10 件を表示</p>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">日付</TableHead>
                    <TableHead>タイトル</TableHead>
                    <TableHead className="w-24">編集</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.date}</TableCell>
                      <TableCell>{notification.title}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          編集
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* ページャー */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-gray-700">
                ページ {currentPage} / {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  前へ
                </Button>

                {/* ページ番号表示（最大5ページまで表示） */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8"
                    >
                      {pageNum}
                    </Button>
                  )
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  次へ
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
