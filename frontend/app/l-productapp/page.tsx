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
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

export default function NewApplication() {
  const [publicStartDate, setPublicStartDate] = useState<Date>()
  const [publicEndDate, setPublicEndDate] = useState<Date>()
  const [saleStartDate, setSaleStartDate] = useState<Date>()
  const [saleEndDate, setSaleEndDate] = useState<Date>()
  const [seasons, setSeasons] = useState<string[]>([])
  const [salesChannels, setSalesChannels] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: File | null }>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  })

  // 現在年から3年後までの年を生成
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 4 }, (_, i) => currentYear + i)

  const handleSeasonChange = (season: string, checked: boolean) => {
    if (checked) {
      setSeasons([...seasons, season])
    } else {
      setSeasons(seasons.filter((s) => s !== season))
    }
  }

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
        <div className="max-w-4xl mx-auto">
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
                <div>
                  <Label className="text-sm font-medium text-gray-700">社名</Label>
                  <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded-md">株式会社サンプル</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">部署</Label>
                  <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded-md">商品企画部</div>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">担当者名</Label>
                  <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded-md">田中太郎</div>
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
                  <div>
                    <Label htmlFor="season-year" className="text-sm font-medium text-gray-700">
                      シーズン年 <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="年を選択してください" />
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
                    <div className="mt-2 space-y-2">
                      {["春", "夏", "秋", "冬"].map((season) => (
                        <div key={season} className="flex items-center space-x-2">
                          <Checkbox
                            id={season}
                            checked={seasons.includes(season)}
                            onCheckedChange={(checked) => handleSeasonChange(season, checked as boolean)}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div>
                    <Label className="text-sm font-medium text-gray-700">公開予定日（開始）</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {publicStartDate ? format(publicStartDate, "yyyy/MM/dd", { locale: ja }) : "日付を選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={publicStartDate}
                          onSelect={setPublicStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">公開予定日（終了）</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {publicEndDate ? format(publicEndDate, "yyyy/MM/dd", { locale: ja }) : "日付を選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={publicEndDate}
                          onSelect={setPublicEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* 販売予定日 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">販売予定日（開始）</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {saleStartDate ? format(saleStartDate, "yyyy/MM/dd", { locale: ja }) : "日付を選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={saleStartDate}
                          onSelect={setSaleStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">販売予定日（終了）</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {saleEndDate ? format(saleEndDate, "yyyy/MM/dd", { locale: ja }) : "日付を選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={saleEndDate}
                          onSelect={setSaleEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* 販売先と販路タイプ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="sales-destination" className="text-sm font-medium text-gray-700">
                      販売先
                    </Label>
                    <Input id="sales-destination" className="mt-1" placeholder="販売先を入力" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">販路タイプ</Label>
                    <div className="mt-2 space-y-2">
                      {["専門店", "量販店", "通信販売", "その他"].map((channel) => (
                        <div key={channel} className="flex items-center space-x-2">
                          <Checkbox
                            id={channel}
                            checked={salesChannels.includes(channel)}
                            onCheckedChange={(checked) => handleSalesChannelChange(channel, checked as boolean)}
                          />
                          <Label htmlFor={channel} className="text-sm">
                            {channel}
                          </Label>
                        </div>
                      ))}
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
