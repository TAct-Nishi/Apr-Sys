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
      title: "TOROYロゴマニュアル",
    },
    {
      id: 2,
      date: "2024-01-18",
      title: "TOROYブランドマニュアル",
    },
    {
      id: 3,
      date: "2024-01-15",
      title: "TOROYブランド 品質基準",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="brand-manual" />

      {/* メインコンテンツ */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">ブランドマニュアル</h1>


          {/* お知らせ一覧 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">ロゴマニュアル</h2>
            </div>

            <div className="overflow-x-auto">
              <Table>
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

          </div>
        </div>
      </main>
    </div>
  )
}
