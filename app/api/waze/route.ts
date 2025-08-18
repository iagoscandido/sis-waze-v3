export const revalidate = 120; // cache automático por 2 minutos

export async function GET() {
  try {
    const res = await fetch(
      "https://www.waze.com/row-partnerhub-api/feeds-tvt/?id=11072621667",
      {
        next: { revalidate: 120 }, // garante cache no servidor
      }
    );

    if (!res.ok) {
      return new Response("Erro ao buscar dados do Waze", {
        status: res.status,
      });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Erro API Waze:", err);
    return new Response("Erro interno", { status: 500 });
  }
}
