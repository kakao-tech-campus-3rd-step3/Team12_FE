import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  width?: string;
  height?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchBarProps> = ({
  placeholder = '검색하기',
  width = 'w-full',
  height = 'py-2',
  value,
  onChange,
}) => {
  return (
    <div className={`relative ${width}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-4 ${height} border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
      />
    </div>
  );
};

export default SearchInput;
