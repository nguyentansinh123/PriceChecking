import { getAllProducts } from '@/lib/productapi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface UseGetAllProductsOptions {
  initialPage?: number;
  initialLimit?: number;
}

export default function useGetAllProducts({ initialPage = 1, initialLimit = 10 }: UseGetAllProductsOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => getAllProducts(page, limit),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); 
  };

  return {
    products: data?.products || [],
    isLoading,
    isError,
    refetch,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    success: data?.success || false,
    message: data?.message || '',
    totalPages: data?.pagination?.totalPages || 1,
    totalProducts: data?.pagination?.totalProducts || 0,
  };
}