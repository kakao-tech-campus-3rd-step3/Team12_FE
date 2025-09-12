import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) => {
  const getAllPages = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center pt-2 ${className}`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
            currentPage > 1 ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2">
          {getAllPages().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`transition-all duration-200 hover:scale-110 ${
                currentPage === page
                  ? 'w-8 h-3 bg-blue-500 rounded-full'
                  : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
            currentPage < totalPages
              ? 'text-gray-600 hover:bg-gray-100'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
