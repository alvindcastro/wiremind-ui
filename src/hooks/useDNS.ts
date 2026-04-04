import { useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';
import type { components } from '@/api/schema';

export type EnrichedDNSEvent = components['schemas']['EnrichedDNSEvent'];

export function useDNS(jobId?: string) {
  return useQuery({
    queryKey: ['dns', jobId],
    queryFn: async () => {
      const { data, error } = await client.GET('/dns', {
        params: {
          query: {
            job_id: jobId,
            limit: 100,
          },
        },
      });

      if (error) {
        throw new Error('Failed to fetch DNS events');
      }

      return data || [];
    },
  });
}
