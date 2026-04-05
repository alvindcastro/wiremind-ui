import createClient from "openapi-fetch";
import type { paths } from "./schema";

const API_URL = import.meta.env.VITE_API_URL || "/api/v1";

export const client = createClient<paths>({
  baseUrl: API_URL,
});
