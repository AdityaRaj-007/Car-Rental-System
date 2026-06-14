import z from "zod";

export const SignupSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});
