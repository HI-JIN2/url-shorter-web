"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setShortUrl(data.short_url);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 text-center">
          URL Shortener
        </h1>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="단축할 URL을 입력하세요"
          className="
            w-full px-4 py-3 mb-4 
            rounded-lg border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            bg-white text-gray-900 placeholder-gray-400
          "
        />

        <button
          onClick={handleShorten}
          disabled={loading}
          className="
            w-full py-3 rounded-lg font-semibold
            text-white 
            bg-blue-600 hover:bg-blue-700
            disabled:bg-blue-300 transition
          "
        >
          {loading ? "생성 중..." : "단축 URL 만들기"}
        </button>

        {shortUrl && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-gray-700 mb-1 font-medium">단축 URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-600 underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
