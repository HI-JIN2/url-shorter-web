"use client";

import { useEffect, useState } from "react";

export default function StatsPage({ params }: { params: { code: string } }) {
  const { code } = params;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/${code}`);
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [code]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!data)
    return (
      <div className="p-6 text-red-500">
        Stats not found for code: <b>{code}</b>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4">📊 URL Statistics</h1>

      <div className="space-y-3">
        <div>
          <div className="text-gray-500 text-sm">Short code</div>
          <div className="text-lg font-semibold">{code}</div>
        </div>

        <div>
          <div className="text-gray-500 text-sm">Original URL</div>
          <a
            href={data.original_url}
            target="_blank"
            className="text-blue-600 underline break-all"
          >
            {data.original_url}
          </a>
        </div>

        <div>
          <div className="text-gray-500 text-sm">Hit Count</div>
          <div className="text-lg font-semibold">{data.hit_count}</div>
        </div>

        <div>
          <div className="text-gray-500 text-sm">Created At</div>
          <div className="text-lg font-semibold">
            {new Date(data.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
