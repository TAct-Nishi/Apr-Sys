"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // ここでAPI認証処理を行う（例: fetchでサーバーにPOST）
    // 今回はダミーで「user01 / password」なら成功とします
    if (userId === "user01" && password === "password") {
      // 認証成功時、HOMEへリダイレクト
      router.push("/")
    } else {
      setError("ユーザーIDまたはパスワードが間違っています")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">ユーザーID</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">パスワード</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          ログイン
        </button>
      </form>
    </div>
  )
}
