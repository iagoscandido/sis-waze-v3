import { User as AppUser } from "@/lib/definitions";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: AppUser & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
  }
}
