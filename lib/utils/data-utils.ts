export function formatDate(rawDate: string): string {
  const dateObj = new Date(rawDate);
  return dateObj.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  });
}
