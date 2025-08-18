const Loading = () => {
  return (
    <main className="min-h-screen p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Rotas monitoradas</h1>
        <p className="text-sm text-gray-500">Carregando dados...</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl shadow-md bg-gray-200 animate-pulse h-32"
          />
        ))}
      </div>
    </main>
  );
};

export default Loading;
