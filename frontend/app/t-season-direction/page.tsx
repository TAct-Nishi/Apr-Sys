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
      title: "2025AWシーズンディレクション",
    },
    {
      id: 2,
      date: "2024-01-18",
      title: "2025SSシーズンディレクション",
    },
    {
      id: 3,
      date: "2024-01-15",
      title: "2024AWシーズンディレクション",
    },
    {
      id: 4,
      date: "2024-01-12",
      title: "2024SSシーズンディレクション",
    },
    {
      id: 5,
      date: "2024-01-10",
      title: "2023AWシーズンディレクション",
    },
    {
      id: 6,
      date: "2024-01-08",
      title: "2023SSシーズンディレクション",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="t-season-direction" />

      {/* メインコンテンツ */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">シーズンディレクションの設定</h1>

          {/* 新規追加ボタン */}
          <div className="mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              新規シーズンディレクション追加
            </Button>
          </div>

          {/* お知らせ一覧 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">シーズンディレクション一覧</h2>
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
          </div>
        </div>
      </main>
    </div>
  )
}
