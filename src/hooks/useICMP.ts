import { useQuery } from "@tanstack/react-query";
import { client } from "@/api/client";

export function useICMP() {
  return useQuery({
    queryKey: ["icmp"],
    queryFn: async () => {
      // @ts-ignore - The /icmp endpoint exists in the Go backend
      const { data, error } = await client.GET("/icmp", {
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
