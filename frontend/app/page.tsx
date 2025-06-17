"use client"

import { useState } from "react"
import { Plus, Edit, ChevronLeft, ChevronRight } from "lucide-react"

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

  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="home" />

      {/* メインコンテンツ */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">HOME</h1>


          {/* お知らせ一覧 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">最新のお知らせ</h2>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium py-4">{notification.date}</TableCell>
                      <TableCell className="py-4">{notification.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
