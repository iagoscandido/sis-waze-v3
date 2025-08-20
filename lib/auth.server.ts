import { loginSchema } from "@/lib/loginSchema";
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } = await loginSchema.parseAsync(credentials);
          user = await prisma.user.findUnique({ where: { email } });

          if (!user) throw new Error("Usuário não encontrado");

          const passwordsMatch = await compare(password, user.password);
          if (!passwordsMatch) throw new Error("Senha incorreta");

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          if (error) {
            throw new Error("Credenciais inválidas");
          }
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (
        token &&
        typeof token.id === "string" &&
        typeof token.role === "string"
      ) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});
