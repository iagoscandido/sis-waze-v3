"use client";

import { useDashboardStatus } from "@/lib/hooks/useDashboardStatus";

const DashboardHeadder = () => {
  const { connectionStatus, updateTime } = useDashboardStatus();

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                connectionStatus.status === "connected"
                  ? "bg-green-500"
                  : connectionStatus.status === "loading"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
              }`}
            ></span>
            <span className={`text-sm ${connectionStatus.color}`}>
              {connectionStatus.status === "connected"
                ? "Conectado"
                : connectionStatus.status === "loading"
                ? "Carregando..."
                : connectionStatus.status === "updating"
                ? "Atualizando..."
                : "Erro de conexão"}
            </span>
          </div>
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm text-gray-600">
            Última atualização: {updateTime}
          </p>
        </div>
      </div>
    </>
  );
};

export default DashboardHeadder;
