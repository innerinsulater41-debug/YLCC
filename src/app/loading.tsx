export default function Loading() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-stone-800 border-t-amber-500 rounded-full animate-spin" />
        <div className="space-y-1">
          <div className="text-sm font-bold text-stone-900">Loading YLCC Platform</div>
          <div className="text-xs text-stone-500">Preparing institutional data and sandboxes...</div>
        </div>
      </div>
    </div>
  );
}
