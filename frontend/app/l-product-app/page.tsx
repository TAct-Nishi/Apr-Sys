"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"

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
  const [seasonYear, setSeasonYear] = useState<string>("");

  // useStateで管理
  // 公開予定日
  const [publicStartDate, setPublicStartDate] = useState<string>("");
  const [publicEndDate, setPublicEndDate] = useState<string>("");

  // 販売予定日
  const [saleStartDate, setSaleStartDate] = useState<string>("");
  const [saleEndDate, setSaleEndDate] = useState<string>("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // フォームの値を取得
    const formData = new FormData(e.currentTarget);
    const data = {
      // 例: name, description など
      name: formData.get('name'),
      description: formData.get('description'),
      // 必要なカラムを追加
    };

    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 必要なら認証トークンも
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert('申請が送信されました');
      // フォームリセットなど
    } else {
      alert('送信に失敗しました');
    }
  };


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
      <Header currentPage="l-applications" />

      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">新規申請</h1>

          <form className="space-y-8" onSubmit={handleSubmit}>
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
                      <Select value={seasonYear} onValueChange={v => setSeasonYear(v)}>
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
                        <input type="hidden" name="season_year" value={seasonYear} />
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        春夏秋冬 <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-2 flex flex-row space-x-4">
                        {["春", "夏", "秋", "冬"].map((season) => (
                          <div key={season} className="flex items-center space-x-2">
                            <Checkbox
                              id={season}
                              // name属性は不要
                              checked={seasons.includes(season)}
                              onCheckedChange={(checked: boolean) => handleSeasonChange(season, checked as boolean)}
                            />
                            <Label htmlFor={season} className="text-sm">
                              {season}
                            </Label>
                          </div>
                        ))}
                        {/* カンマ区切りでhidden inputに格納 */}
                        <input type="hidden" name="seasons" value={seasons.join(",")} />
                      </div>                    </div>
                  </div>
                  {/* 商品情報 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="product-name" className="text-sm font-medium text-gray-700">
                        商品名 <span className="text-red-500">*</span>
                      </Label>
                      <Input id="product-name" name="product_name" className="mt-1" placeholder="商品名を入力" />
                    </div>
                    <div>
                      <Label htmlFor="product-code" className="text-sm font-medium text-gray-700">
                        品番 <span className="text-red-500">*</span>
                      </Label>
                      <Input id="product-code" name="product_number" className="mt-1" placeholder="品番を入力" />
                    </div>
                    <div>
                      <Label htmlFor="production-quantity" className="text-sm font-medium text-gray-700">
                        生産数量
                      </Label>
                      <Input id="production-quantity" name="production_quantity" className="mt-1" placeholder="生産数量を入力" />
                    </div>
                  </div>
                </div>

                {/* 素材・サイズ・カラー・上代を1行4列で */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <Label htmlFor="material" className="text-sm font-medium text-gray-700">
                      素材
                    </Label>
                    <Input id="material" name="material" className="mt-1" placeholder="素材を入力" />
                  </div>
                  <div>
                    <Label htmlFor="size" className="text-sm font-medium text-gray-700">
                      サイズ
                    </Label>
                    <Input id="size" name="sizes" className="mt-1" placeholder="サイズを入力" />
                  </div>
                  <div>
                    <Label htmlFor="color" className="text-sm font-medium text-gray-700">
                      カラー
                    </Label>
                    <Input id="color" name="colors" className="mt-1" placeholder="カラーを入力" />
                  </div>
                  <div>
                    <Label htmlFor="retail-price" className="text-sm font-medium text-gray-700">
                      上代
                    </Label>
                    <Input id="retail-price" name="unit_price" className="mt-1" placeholder="上代を入力" />
                  </div>
                </div>

                {/* 機能説明 */}
                <div>
                  <Label htmlFor="function-description" className="text-sm font-medium text-gray-700">
                    機能説明
                  </Label>
                  <Textarea id="function-description" name="feature_description" className="mt-1" placeholder="機能説明を入力" rows={4} />
                </div>

                {/* 公開予定日 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 公開予定日（開始） */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">公開予定日（開始）</Label>
                    <Input
                      type="text"
                      placeholder="例: 2024-07-01"
                      name="public_start_date"
                      value={publicStartDate}
                      onChange={e => setPublicStartDate(e.target.value)}
                      className="mt-1"
                      pattern="\d{4}-\d{2}-\d{2}"
                      title="YYYY-MM-DD形式で入力してください"
                    />
                  </div>
                  {/* 公開予定日（終了） */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">公開予定日（終了）</Label>
                    <Input
                      type="text"
                      placeholder="例: 2024-07-01"
                      name="public_end_date"
                      value={publicEndDate}
                      onChange={e => setPublicEndDate(e.target.value)}
                      className="mt-1"
                      pattern="\d{4}-\d{2}-\d{2}"
                      title="YYYY-MM-DD形式で入力してください"
                    />
                  </div>
                </div>

                {/* 販売予定日 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* 販売予定日（開始） */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">販売予定日（開始）</Label>
                    <Input
                      type="text"
                      placeholder="例: 2024-07-01"
                      name="sale_start_date"
                      value={saleStartDate}
                      onChange={e => setSaleStartDate(e.target.value)}
                      className="mt-1"
                      pattern="\d{4}-\d{2}-\d{2}"
                      title="YYYY-MM-DD形式で入力してください"
                    />
                  </div>
                  {/* 販売予定日（終了） */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">販売予定日（終了）</Label>
                    <Input
                      type="text"
                      placeholder="例: 2024-07-01"
                      name="sale_end_date"
                      value={saleEndDate}
                      onChange={e => setSaleEndDate(e.target.value)}
                      className="mt-1"
                      pattern="\d{4}-\d{2}-\d{2}"
                      title="YYYY-MM-DD形式で入力してください"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="sale-destination" className="text-sm font-medium text-gray-700">
                      販売先
                    </Label>
                    <Input id="sale-destination" name="sale_channel" className="mt-1" placeholder="販売先を入力" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">販路タイプ</Label>
                    <div className="mt-2 flex flex-row space-x-4">
                      {["専門店", "量販店", "通信販売", "その他"].map((channel) => (
                        <div key={channel} className="flex items-center space-x-2">
                          <Checkbox
                            id={channel}
                            // name属性は不要
                            checked={salesChannels.includes(channel)}
                            onCheckedChange={(checked) => handleSalesChannelChange(channel, checked as boolean)}
                          />
                          <Label htmlFor={channel} className="text-sm">
                            {channel}
                          </Label>
                        </div>
                      ))}
                      {/* カンマ区切りでhidden inputに格納 */}
                      <input type="hidden" name="sale_route_type" value={salesChannels.join(",")} />
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
