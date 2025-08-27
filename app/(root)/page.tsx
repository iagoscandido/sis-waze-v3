import { auth } from "@/lib/auth.server";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }
  return redirect("/waze-routes-test/cards");
};

export default page;
