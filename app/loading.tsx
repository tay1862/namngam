export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-rococo-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-pink-200 border-t-pink-600 mb-4"></div>
        <p className="text-rococo-700 font-medium">ກຳລັງໂຫຼດ...</p>
      </div>
    </div>
  );
}
