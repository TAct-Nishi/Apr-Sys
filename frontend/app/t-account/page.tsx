"use client"

import { Plus, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Header from "@/components/header"

export default function AccountManagement() {
  // ライセンサーアカウントのサンプルデータ
  const licenserAccounts = [
    {
      id: "LIC-001",
      accountName: "管理者アカウント",
      email: "admin@example.com",
    },
    {
      id: "LIC-002",
      accountName: "営業部アカウント",
      email: "sales@example.com",
    },
    {
      id: "LIC-003",
      accountName: "マーケティング部アカウント",
      email: "marketing@example.com",
    },
    {
      id: "LIC-004",
      accountName: "法務部アカウント",
      email: "marketing@example.com",
    },
    {
      id: "LIC-005",
      accountName: "財務部アカウント",
      email: "marketing@example.com",

    },
  ]

  // ライセンシーアカウントのサンプルデータ
  const licenseeAccounts = [
    {
      id: "LEE-001",
      licenseeName: "株式会社サンプル",
      accountName: "田中太郎",
      email: "tanaka@example.com",
    },
    {
      id: "LEE-002",
      licenseeName: "テスト株式会社",
      accountName: "佐藤花子",
      email: "sato@example.com",
    },
    {
      id: "LEE-003",
      licenseeName: "デモ企業",
      accountName: "鈴木一郎",
      email: "suzuki@example.com",
    },
    {
      id: "LEE-004",
      licenseeName: "サンプル商事",
      accountName: "高橋美咲",
      email: "takahashi@example.com",
    },
    {
      id: "LEE-005",
      licenseeName: "テスト工業",
      accountName: "山田健太",
      email: "yamada@example.com",
    },
    {
      id: "LEE-006",
      licenseeName: "デモ製作所",
      accountName: "渡辺由美",
      email: "watanabe@example.com",
    },
    {
      id: "LEE-007",
      licenseeName: "サンプル技研",
      accountName: "中村大輔",
      email: "nakamura@example.com",
    },
    {
      id: "LEE-008",
      licenseeName: "テスト開発",
      accountName: "小林恵子",
      email: "kobayashi@example.com",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="t-account" />

      {/* メインコンテンツ */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">アカウント管理</h1>

          {/* ライセンサーアカウント一覧セクション */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">ライセンサーアカウント一覧</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                アカウント新規追加
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <p className="text-sm text-gray-600">全 {licenserAccounts.length} 件</p>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">アカウントID</TableHead>
                      <TableHead>アカウント名</TableHead>
                      <TableHead>メールアドレス</TableHead>
                      <TableHead className="w-24">編集</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {licenserAccounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">{account.id}</TableCell>
                        <TableCell>{account.accountName}</TableCell>
                        <TableCell>{account.email}</TableCell>
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

          {/* ライセンシーアカウント一覧セクション */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">ライセンシーアカウント一覧</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                アカウント新規追加
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <p className="text-sm text-gray-600">全 {licenseeAccounts.length} 件</p>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">アカウントID</TableHead>
                      <TableHead>ライセンシー名</TableHead>
                      <TableHead>アカウント名</TableHead>
                      <TableHead>メールアドレス</TableHead>
                      <TableHead className="w-24">編集</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {licenseeAccounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">{account.id}</TableCell>
                        <TableCell>{account.licenseeName}</TableCell>
                        <TableCell>{account.accountName}</TableCell>
                        <TableCell>{account.email}</TableCell>
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
        </div>
      </main>
    </div>
  )
}
