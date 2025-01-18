import { config } from "dotenv";
import { z } from "zod";

// Load environment variables
config();

// Define a schema for environment variables
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000"),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  API_KEY: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

// Create a type for the validated environment variables
type Env = z.infer<typeof envSchema>;

// Export the validated environment variables
export const ENV: Env = env;
