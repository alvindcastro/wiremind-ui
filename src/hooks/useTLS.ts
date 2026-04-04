import { useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';
import type { components } from '@/api/schema';

export type EnrichedTLSEvent = components['schemas']['EnrichedTLSEvent'];

export function useTLS(jobId?: string) {
  return useQuery({
    queryKey: ['tls', jobId],
    queryFn: async () => {
      const { data, error } = await client.GET('/tls', {
        params: {
          query: {
            job_id: jobId,
            limit: 100,
          },
        },
      });

      if (error) {
        throw new Error('Failed to fetch TLS events');
      }

      return data || [];
    },
  });
}
