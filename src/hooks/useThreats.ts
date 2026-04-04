import { useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';
import { components } from '@/api/schema';

type EnrichedFlow = components['schemas']['EnrichedFlow'];

export function useThreats(params?: {
  limit?: number;
}) {
  return useQuery({
    queryKey: ['threats', params],
    queryFn: async () => {
      const { data, error } = await client.GET('/threats', {
        params: {
          query: params,
        },
      });
      if (error) throw error;
      return data as EnrichedFlow[];
    },
  });
}
