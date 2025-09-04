import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function timeAgo(dateString: string): string {
  return dayjs(dateString).fromNow();
}

export function secondsToMinutes(seconds: number): number {
  return seconds / 60;
}
