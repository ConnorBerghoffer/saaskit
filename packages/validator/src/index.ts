import { z } from "zod";

export const userSchema = {
  create: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
};

export type CreateUserInput = z.infer<typeof userSchema.create>;

export const validate =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): z.infer<T> => {
    return schema.parse(data);
  };
