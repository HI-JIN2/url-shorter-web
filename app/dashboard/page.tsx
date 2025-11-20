export default async function DashboardPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/urls`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">URL Dashboard</h1>

      <div className="space-y-4">
        {data.map((item: any) => (
          <div
            key={item.short_code}
            className="p-4 border rounded-lg bg-white shadow"
          >
            <div className="font-semibold">{item.original_url}</div>
            <div className="text-gray-500 text-sm">
              Short:{" "}
              <a
                href={`https://url-shorter-web.vercel.app/${item.short_code}`}
                className="text-blue-600 underline"
                target="_blank"
              >
                {item.short_code}
              </a>
            </div>

            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <div>Clicks: {item.hit_count}</div>
              <div>{new Date(item.created_at).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
