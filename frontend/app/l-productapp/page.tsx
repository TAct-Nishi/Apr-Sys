"use client"

import { useState } from "react"
import { Calendar, Upload, X } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

export default function NewApplication() {
  const [seasons, setSeasons] = useState<string[]>([])
  const [salesChannels, setSalesChannels] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: File | null }>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  })



  const handleSeasonChange = (season: string, checked: boolean) => {
    if (checked) {
      setSeasons([...seasons, season])
    } else {
      setSeasons(seasons.filter((s) => s !== season))
    }
  }

  // 年・月・日用の配列
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i); // 今年〜4年後
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // useStateで管理
  // 公開予定日（開始）
  const [publicStartYear, setPublicStartYear] = useState<number | undefined>();
  const [publicStartMonth, setPublicStartMonth] = useState<number | undefined>();
  const [publicStartDay, setPublicStartDay] = useState<number | undefined>();

  // 公開予定日（終了）
  const [publicEndYear, setPublicEndYear] = useState<number | undefined>();
  const [publicEndMonth, setPublicEndMonth] = useState<number | undefined>();
  const [publicEndDay, setPublicEndDay] = useState<number | undefined>();

  // 販売予定日（開始）
  const [saleStartYear, setSaleStartYear] = useState<number | undefined>();
  const [saleStartMonth, setSaleStartMonth] = useState<number | undefined>();
  const [saleStartDay, setSaleStartDay] = useState<number | undefined>();

  // 販売予定日（終了）
  const [saleEndYear, setSaleEndYear] = useState<number | undefined>();
  const [saleEndMonth, setSaleEndMonth] = useState<number | undefined>();
  const [saleEndDay, setSaleEndDay] = useState<number | undefined>();
  // ...同様にpublicEndYear, publicEndMonth, publicEndDayなども用意...
  const handleSalesChannelChange = (channel: string, checked: boolean) => {
    if (checked) {
      setSalesChannels([...salesChannels, channel])
    } else {
      setSalesChannels(salesChannels.filter((c) => c !== channel))
    }
  }

  const handleImageUpload = (imageKey: string, file: File | null) => {
    setUploadedImages({
      ...uploadedImages,
      [imageKey]: file,
    })
  }

  const ImageUploadCard = ({ imageKey, label }: { imageKey: string; label: string }) => {
    const file = uploadedImages[imageKey]

    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
        </CardHeader>
        <CardContent>
          {file ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt={label}
                className="w-full h-32 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleImageUpload(imageKey, null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">画像をアップロード</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null
                  handleImageUpload(imageKey, file)
                }}
                className="hidden"
                id={imageKey}
              />
              <Label htmlFor={imageKey} className="cursor-pointer">
                <Button type="button" variant="outline" size="sm">
                  ファイルを選択
                </Button>
              </Label>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="applications" />

      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">新規申請</h1>

          <form className="space-y-8">
            {/* 固定値セクション */}
            <Card>
              <CardHeader>
                <CardTitle>基本情報</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">申請No.</Label>
                  <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded-md">APP-2024-001</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">日付</Label>
                  <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded-md">2024-01-20</div>
                </div>
                {/* ここから3列横並び */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">社名</Label>
                      <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded-md">株式会社サンプル</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">部署</Label>
                      <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded-md">商品企画部</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">担当者名</Label>
                      <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded-md">田中太郎</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 申請内容セクション */}
            <Card>
              <CardHeader>
                <CardTitle>申請内容</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* シーズン年と春夏秋冬 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="season-year" className="text-sm font-medium text-gray-700">
                        シーズン年 <span className="text-red-500">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="年を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={String(year)}>
                              {year}年
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        春夏秋冬 <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-2 flex flex-row space-x-4"> {/* ← 横並びに */}
                        {["春", "夏", "秋", "冬"].map((season) => (
                          <div key={season} className="flex items-center space-x-2">
                            <Checkbox
                              id={season}
                              checked={seasons.includes(season)}
                              onCheckedChange={(checked: boolean) => handleSeasonChange(season, checked as boolean)}
                            />
                            <Label htmlFor={season} className="text-sm">
                              {season}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* 商品情報 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="product-name" className="text-sm font-medium text-gray-700">
                        商品名 <span className="text-red-500">*</span>
                      </Label>
                      <Input id="product-name" className="mt-1" placeholder="商品名を入力" />
                    </div>
                    <div>
                      <Label htmlFor="product-code" className="text-sm font-medium text-gray-700">
                        品番 <span className="text-red-500">*</span>
                      </Label>
                      <Input id="product-code" className="mt-1" placeholder="品番を入力" />
                    </div>
                    <div>
                      <Label htmlFor="production-quantity" className="text-sm font-medium text-gray-700">
                        生産数量
                      </Label>
                      <Input id="production-quantity" className="mt-1" placeholder="生産数量を入力" />
                    </div>
                  </div>
                </div>

                {/* 素材・サイズ・カラー・上代を1行4列で */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <Label htmlFor="material" className="text-sm font-medium text-gray-700">
                      素材
                    </Label>
                    <Input id="material" className="mt-1" placeholder="素材を入力" />
                  </div>
                  <div>
                    <Label htmlFor="size" className="text-sm font-medium text-gray-700">
                      サイズ
                    </Label>
                    <Input id="size" className="mt-1" placeholder="サイズを入力" />
                  </div>
                  <div>
                    <Label htmlFor="color" className="text-sm font-medium text-gray-700">
                      カラー
                    </Label>
                    <Input id="color" className="mt-1" placeholder="カラーを入力" />
                  </div>
                  <div>
                    <Label htmlFor="retail-price" className="text-sm font-medium text-gray-700">
                      上代
                    </Label>
                    <Input id="retail-price" className="mt-1" placeholder="上代を入力" />
                  </div>
                </div>

                {/* 機能説明 */}
                <div>
                  <Label htmlFor="function-description" className="text-sm font-medium text-gray-700">
                    機能説明
                  </Label>
                  <Textarea id="function-description" className="mt-1" placeholder="機能説明を入力" rows={4} />
                </div>

                {/* 公開予定日 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 公開予定日（開始） */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">公開予定日（開始）</Label>
                    <div className="flex items-end space-x-2 mt-1">
                      {/* 年 */}
                      <div>
                        <Select onValueChange={v => setPublicStartYear(Number(v))}>
                          <SelectTrigger className="w-25">{publicStartYear ? `${publicStartYear}年` : "年"}</SelectTrigger>
                          <SelectContent>
                            {years.map(year => (
                              <SelectItem key={year} value={String(year)}>{year}年</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* 月 */}
                      <div>
                        <Select onValueChange={v => setPublicStartMonth(Number(v))}>
                          <SelectTrigger className="w-20">{publicStartMonth ? `${publicStartMonth}月` : "月"}</SelectTrigger>
                          <SelectContent>
                            {months.map(month => (
                              <SelectItem key={month} value={String(month)}>{month}月</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* 日 */}
                      <div>
                        <Select onValueChange={v => setPublicStartDay(Number(v))}>
                          <SelectTrigger className="w-20">{publicStartDay ? `${publicStartDay}日` : "日"}</SelectTrigger>
                          <SelectContent>
                            {days.map(day => (
                              <SelectItem key={day} value={String(day)}>{day}日</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {/* 公開予定日（終了） */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">公開予定日（終了）</Label>
                    <div className="flex items-end space-x-2 mt-1">
                      {/* 年 */}
                      <div>
                        <Select onValueChange={v => setPublicEndYear(Number(v))}>
                          <SelectTrigger className="w-25">{publicEndYear ? `${publicEndYear}年` : "年"}</SelectTrigger>
                          <SelectContent>
                            {years.map(year => (
                              <SelectItem key={year} value={String(year)}>{year}年</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* 月 */}
                      <div>
                        <Select onValueChange={v => setPublicEndMonth(Number(v))}>
                          <SelectTrigger className="w-20">{publicEndMonth ? `${publicEndMonth}月` : "月"}</SelectTrigger>
                          <SelectContent>
                            {months.map(month => (
                              <SelectItem key={month} value={String(month)}>{month}月</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* 日 */}
                      <div>
                        <Select onValueChange={v => setPublicEndDay(Number(v))}>
                          <SelectTrigger className="w-20">{publicEndDay ? `${publicEndDay}日` : "日"}</SelectTrigger>
                          <SelectContent>
                            {days.map(day => (
                              <SelectItem key={day} value={String(day)}>{day}日</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 販売予定日 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* 販売予定日（開始） */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">販売予定日（開始）</Label>
                    <div className="flex items-end space-x-2 mt-1">
                      {/* 年 */}
                      <div>
                        <Select onValueChange={v => setSaleStartYear(Number(v))}>
                          <SelectTrigger className="w-25">{saleStartYear ? `${saleStartYear}年` : "年"}</SelectTrigger>
                          <SelectContent>
                            {years.map(year => (
                              <SelectItem key={year} value={String(year)}>{year}年</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* 月 */}
                      <div>
                        <Select onValueChange={v => setSaleStartMonth(Number(v))}>
                          <SelectTrigger className="w-20">{saleStartMonth ? `${saleStartMonth}月` : "月"}</SelectTrigger>
                          <SelectContent>
                            {months.map(month => (
                              <SelectItem key={month} value={String(month)}>{month}月</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* 日 */}
                      <div>
                        <Select onValueChange={v => setSaleStartDay(Number(v))}>
                          <SelectTrigger className="w-20">{saleStartDay ? `${saleStartDay}日` : "日"}</SelectTrigger>
                          <SelectContent>
                            {days.map(day => (
                              <SelectItem key={day} value={String(day)}>{day}日</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {/* 販売予定日（終了） */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">販売予定日（終了）</Label>
                    <div className="flex items-end space-x-2 mt-1">
                      {/* 年 */}
                      <div>
                        <Select onValueChange={v => setSaleEndYear(Number(v))}>
                          <SelectTrigger className="w-25">{saleEndYear ? `${saleEndYear}年` : "年"}</SelectTrigger>
                          <SelectContent>
                            {years.map(year => (
                              <SelectItem key={year} value={String(year)}>{year}年</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* 月 */}
                      <div>
                        <Select onValueChange={v => setSaleEndMonth(Number(v))}>
                          <SelectTrigger className="w-20">{saleEndMonth ? `${saleEndMonth}月` : "月"}</SelectTrigger>
                          <SelectContent>
                            {months.map(month => (
                              <SelectItem key={month} value={String(month)}>{month}月</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* 日 */}
                      <div>
                        <Select onValueChange={v => setSaleEndDay(Number(v))}>
                          <SelectTrigger className="w-20">{saleEndDay ? `${saleEndDay}日` : "日"}</SelectTrigger>
                          <SelectContent>
                            {days.map(day => (
                              <SelectItem key={day} value={String(day)}>{day}日</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 画像アップロードセクション */}
            <Card>
              <CardHeader>
                <CardTitle>デザイン申請画像</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUploadCard imageKey="image1" label="デザイン申請画像1" />
                  <ImageUploadCard imageKey="image2" label="デザイン申請画像2" />
                  <ImageUploadCard imageKey="image3" label="デザイン申請画像3" />
                  <ImageUploadCard imageKey="image4" label="デザイン申請画像4" />
                </div>
              </CardContent>
            </Card>

            {/* ボタン */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" size="lg">
                仮保存する
              </Button>
              <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
                申請
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
