export default async function StatsPage({ params }: { params: { code: string } }) {
  const { code } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/${code}`, {
    cache: "no-cache"
  });

  if (!res.ok) {
    return <div className="p-6 text-red-500">Stats not found for {code}</div>;
  }

  const data = await res.json();

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
          <a href={data.original_url} target="_blank" className="text-blue-600 underline break-all">
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
