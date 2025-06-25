
export default function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        {/* Espaço para o ícone */}
        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        {/* Espaço para o título */}
        <div className="w-1/2 h-6 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="p-4 space-y-4">
        {/* Espaço para o conteúdo */}
        <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}