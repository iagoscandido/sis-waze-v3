import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Email inválido" }).min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});
