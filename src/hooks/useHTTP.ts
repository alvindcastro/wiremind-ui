import { useQuery } from "@tanstack/react-query";
import { client } from "@/api/client";

export function useHTTP() {
  return useQuery({
    queryKey: ["http"],
    queryFn: async () => {
      const { data, error } = await client.GET("/http", {
        params: {
          query: {
            limit: 100,
          },
        },
      });

      if (error) {
        throw new Error(error as unknown as string);
      }

      return data;
    },
  });
}
