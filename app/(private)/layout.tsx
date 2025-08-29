import type React from "react";
import Footer from "@/components/footer";
import Topbar from "@/components/topbar";

const IrregularitiesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Topbar />
      <main>{children}</main>
      <Footer
        text=" Dashboard de Tráfego • Dados fornecidos por Waze • Atualizado
        automaticamente"
      />
    </div>
  );
};

export default IrregularitiesLayout;
