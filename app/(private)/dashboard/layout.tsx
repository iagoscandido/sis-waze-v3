import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard de Tráfego - Rotas Monitoradas",
  description: "Monitoramento em tempo real de anomalias de tráfego",
  robots: "noindex, nofollow",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
