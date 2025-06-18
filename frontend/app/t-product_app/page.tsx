"use client"

import { useState } from "react"
import { Search, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"

export default function ApplicationManagement() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  // サンプルデータ
  const applications = [
    {
      id: 1,
      licensee: "株式会社サンプル",
      applicationDate: "2024-01-15 14:30",
      applicationNo: "APP-2024-001",
      manufacturerCode: "MFG-001-A",
      productName: "サンプル商品A",
      applicationStatus: "審査中",
      approvalStatus: "承認待ち",
    },
    {
      id: 2,
      licensee: "テスト株式会社",
      applicationDate: "2024-01-14 10:15",
      applicationNo: "APP-2024-002",
      manufacturerCode: "MFG-002-B",
      productName: "テスト商品B",
      applicationStatus: "完了",
      approvalStatus: "承認済み",
    },
    {
      id: 3,
      licensee: "デモ企業",
      applicationDate: "2024-01-13 16:45",
      applicationNo: "APP-2024-003",
      manufacturerCode: "MFG-003-C",
      productName: "デモ商品C",
      applicationStatus: "差し戻し",
      approvalStatus: "要修正",
    },
    // 追加のサンプルデータ
    ...Array.from({ length: 17 }, (_, i) => ({
      id: i + 4,
      licensee: `サンプル企業${i + 1}`,
      applicationDate: `2024-01-${String(12 - (i % 12)).padStart(2, "0")} ${String(9 + (i % 12)).padStart(2, "0")}:${String(15 + (i % 45)).padStart(2, "0")}`,
      applicationNo: `APP-2024-${String(i + 4).padStart(3, "0")}`,
      manufacturerCode: `MFG-${String(i + 4).padStart(3, "0")}-${String.fromCharCode(65 + (i % 26))}`,
      productName: `商品${String.fromCharCode(65 + (i % 26))}`,
      applicationStatus: ["審査中", "完了", "差し戻し"][i % 3],
      approvalStatus: ["承認待ち", "承認済み", "要修正"][i % 3],
    })),
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      審査中: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      完了: { variant: "default" as const, color: "bg-green-100 text-green-800" },
      差し戻し: { variant: "destructive" as const, color: "bg-red-100 text-red-800" },
      承認待ち: { variant: "secondary" as const, color: "bg-blue-100 text-blue-800" },
      承認済み: { variant: "default" as const, color: "bg-green-100 text-green-800" },
      要修正: { variant: "destructive" as const, color: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["審査中"]
    return <Badge className={config.color}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="applications" />

      {/* メインコンテンツ */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">申請一覧</h1>

        {/* 検索エリア */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">検索条件</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ライセンシー</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="sample-corp">株式会社サンプル</SelectItem>
                  <SelectItem value="test-corp">テスト株式会社</SelectItem>
                  <SelectItem value="demo-corp">デモ企業</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">申請期間</label>
              <div className="flex space-x-2">
                <Select>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="年" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-16">
                    <SelectValue placeholder="月" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">申請状況</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="reviewing">審査中</SelectItem>
                  <SelectItem value="completed">完了</SelectItem>
                  <SelectItem value="returned">差し戻し</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">商品名</label>
              <Input placeholder="商品名を入力" />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button>
              <Search className="w-4 h-4 mr-2" />
              検索
            </Button>
          </div>
        </div>

        {/* 申請一覧 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">申請一覧</h2>
            <p className="text-sm text-gray-600 mt-1">全 100 件中 1-20 件を表示</p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ライセンシー</TableHead>
                  <TableHead>申請日時</TableHead>
                  <TableHead>申請No</TableHead>
                  <TableHead>メーカー品番</TableHead>
                  <TableHead>申請商品</TableHead>
                  <TableHead>申請状況</TableHead>
                  <TableHead>承認状況</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.licensee}</TableCell>
                    <TableCell>{app.applicationDate}</TableCell>
                    <TableCell>{app.applicationNo}</TableCell>
                    <TableCell>{app.manufacturerCode}</TableCell>
                    <TableCell>
                      <Link href={`/applications/${app.id}`} className="text-blue-600 hover:text-blue-800 underline">
                        {app.productName}
                      </Link>
                    </TableCell>
                    <TableCell>{getStatusBadge(app.applicationStatus)}</TableCell>
                    <TableCell>{getStatusBadge(app.approvalStatus)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8"
                >
                  {page}
                </Button>
              ))}

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
