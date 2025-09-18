import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { UseFiltersReturn } from '../../../../domains/layout/recommendations/types/filtering';
import styles from './Pagination.module.css';

interface PaginationProps {
  filters: UseFiltersReturn;
  itemsPerPageOptions?: readonly number[];
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  filters,
  itemsPerPageOptions = [6, 12, 24, 48] as const,
  showQuickJumper = true,
  showSizeChanger = true,
}) => {
  const { results, actions } = filters;
  const { pagination } = results;

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const { currentPage, totalPages } = pagination;
    const pages: Array<number | 'ellipsis'> = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (currentPage > 4) {
        pages.push('ellipsis');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 3) {
        pages.push('ellipsis');
      }
      
      // Show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [pagination]);

  // Quick jump handler
  const handleQuickJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const page = parseInt(target.value, 10);
      
      if (!isNaN(page) && page >= 1 && page <= pagination.totalPages) {
        actions.updatePagination(page);
        target.blur();
      }
    }
  };

  // Items per page change handler
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    actions.updatePagination(1, newItemsPerPage);
  };

  // Calculate current range
  const startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endItem = Math.min(
    pagination.currentPage * pagination.itemsPerPage,
    pagination.totalItems
  );

  return (
    <div className={styles.paginationContainer}>
      {/* Items per page selector */}
      {showSizeChanger && (
        <div className={styles.pageSizeSelector}>
          <label className={styles.pageSizeLabel}>
            Show:
            <select
              value={pagination.itemsPerPage}
              onChange={handleItemsPerPageChange}
              className={styles.pageSizeSelect}
            >
              {itemsPerPageOptions.map(size => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Page info */}
      <div className={styles.pageInfo}>
        {pagination.totalItems > 0 ? (
          <>
            Showing {startItem.toLocaleString()}–{endItem.toLocaleString()} of{' '}
            {pagination.totalItems.toLocaleString()} recommendations
          </>
        ) : (
          'No recommendations found'
        )}
      </div>

      {/* Pagination controls - only show if more than one page */}
      {pagination.totalPages > 1 && (
        <div className={styles.paginationControls}>
        {/* First page button */}
        <button
          onClick={() => actions.updatePagination(1)}
          disabled={pagination.currentPage === 1}
          className={styles.pageButton}
          title="First page"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Previous page button */}
        <button
          onClick={() => actions.updatePagination(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className={styles.pageButton}
          title="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page number buttons */}
        <div className={styles.pageNumbers}>
          {pageNumbers.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span key={`ellipsis-${index < 3 ? 'start' : 'end'}`} className={styles.ellipsis}>
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => actions.updatePagination(page)}
                className={`${styles.pageNumber} ${
                  pagination.currentPage === page ? styles.active : ''
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next page button */}
        <button
          onClick={() => actions.updatePagination(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className={styles.pageButton}
          title="Next page"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last page button */}
        <button
          onClick={() => actions.updatePagination(pagination.totalPages)}
          disabled={pagination.currentPage === pagination.totalPages}
          className={styles.pageButton}
          title="Last page"
        >
          <ChevronsRight size={16} />
        </button>
        </div>
      )}

      {/* Quick jump input */}
      {showQuickJumper && pagination.totalPages > 5 && (
        <div className={styles.quickJump}>
          <label className={styles.quickJumpLabel}>
            Go to page:
            <input
              type="number"
              min="1"
              max={pagination.totalPages}
              placeholder={pagination.currentPage.toString()}
              onKeyDown={handleQuickJump}
              className={styles.quickJumpInput}
            />
          </label>
        </div>
      )}
    </div>
  );
};