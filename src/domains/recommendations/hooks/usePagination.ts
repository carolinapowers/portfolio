import { useState, useCallback, useMemo, useEffect } from 'react';

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

interface PaginationInfo extends PaginationState {
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface UsePaginationReturn {
  pagination: PaginationInfo;
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  paginate: <T>(items: T[]) => T[];
  pageNumbers: number[];
  getPageRange: (maxVisible?: number) => number[];
}

export const usePagination = (
  totalItems: number,
  initialItemsPerPage: number = 10,
  initialPage: number = 1
): UsePaginationReturn => {
  const [state, setState] = useState<PaginationState>({
    currentPage: initialPage,
    itemsPerPage: initialItemsPerPage,
  });

  // Calculate pagination info
  const pagination = useMemo((): PaginationInfo => {
    const totalPages = Math.max(1, Math.ceil(totalItems / state.itemsPerPage));
    const currentPage = Math.min(Math.max(1, state.currentPage), totalPages);
    const startIndex = (currentPage - 1) * state.itemsPerPage;
    const endIndex = Math.min(startIndex + state.itemsPerPage, totalItems);

    return {
      currentPage,
      itemsPerPage: state.itemsPerPage,
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [state.currentPage, state.itemsPerPage, totalItems]);

  // Reset to first page when total items change significantly
  useEffect(() => {
    if (state.currentPage > pagination.totalPages) {
      setState(prev => ({ ...prev, currentPage: 1 }));
    }
  }, [pagination.totalPages, state.currentPage]);

  const setPage = useCallback((page: number) => {
    setState(prev => ({
      ...prev,
      currentPage: Math.max(1, page),
    }));
  }, []);

  const nextPage = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: prev.currentPage + 1,
    }));
  }, []);

  const previousPage = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: Math.max(1, prev.currentPage - 1),
    }));
  }, []);

  const firstPage = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: 1,
    }));
  }, []);

  const lastPage = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: Math.max(1, Math.ceil(totalItems / prev.itemsPerPage)),
    }));
  }, [totalItems]);

  const setItemsPerPage = useCallback((itemsPerPage: number) => {
    setState(prev => ({
      ...prev,
      itemsPerPage: Math.max(1, itemsPerPage),
      currentPage: 1, // Reset to first page when items per page changes
    }));
  }, []);

  const paginate = useCallback(<T,>(items: T[]): T[] => {
    return items.slice(pagination.startIndex, pagination.endIndex);
  }, [pagination.startIndex, pagination.endIndex]);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: pagination.totalPages }, (_, i) => i + 1);
  }, [pagination.totalPages]);

  const getPageRange = useCallback((maxVisible: number = 5): number[] => {
    const { currentPage, totalPages } = pagination;

    if (totalPages <= maxVisible) {
      return pageNumbers;
    }

    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - halfVisible);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [pagination, pageNumbers]);

  return {
    pagination,
    setPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setItemsPerPage,
    paginate,
    pageNumbers,
    getPageRange,
  };
};