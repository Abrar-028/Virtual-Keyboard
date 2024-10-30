import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCachedData, setCachedData } from '@/lib/cache';

interface UseCachedDataOptions<T> {
  key: string;
  initialData?: T;
  isDynamic?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

export function useCachedData<T>({
  key,
  initialData,
  isDynamic = false,
  staleTime = 1000 * 60 * 5, // 5 minutes
  cacheTime = 1000 * 60 * 30, // 30 minutes
}: UseCachedDataOptions<T>) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cached', key],
    queryFn: () => getCachedData<T>(key),
    initialData,
    staleTime,
    cacheTime,
  });

  const { mutate: updateData } = useMutation({
    mutationFn: (newData: T) => {
      setCachedData(key, newData, isDynamic);
      return newData;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['cached', key], newData);
    },
  });

  return {
    data,
    isLoading,
    error,
    updateData,
  };
}