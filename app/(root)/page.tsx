import { redirect } from "next/navigation";
import { auth } from "@/lib/auth.server";

const page = async () => {
  // const session = await auth();

  // if (!session || !session.user || session.user.role !== "ADMIN") {
  //   redirect("/login");
  // }
  return redirect("/waze-irregularities-test/cards");
};

export default page;
