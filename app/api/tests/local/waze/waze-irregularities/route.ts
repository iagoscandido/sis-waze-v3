import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Caminho absoluto para o arquivo JSON
    const filePath = path.join(
      process.cwd(),
      "data",
      "sampleIrregularities.json"
    );

    // Lendo o conteúdo do arquivo
    const fileData = fs.readFileSync(filePath, "utf8");

    // Convertendo para objeto JS
    const jsonData = JSON.parse(fileData);

    // Retornando como JSON
    return NextResponse.json(jsonData);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao ler o arquivo JSON" },
      { status: 500 }
    );
  }
}
