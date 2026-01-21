import { useState, useMemo } from 'react';
import { Search, Users } from 'lucide-react';

interface SearchableListProps<T> {
  items: T[];
  searchKeys: (keyof T)[];
  renderItem: (item: T, index: number) => React.ReactNode;
  placeholder?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
  gridClassName?: string;
}

export default function SearchableList<T>({
  items,
  searchKeys,
  renderItem,
  placeholder = 'Search...',
  emptyTitle = 'No Results',
  emptyDescription = 'Try adjusting your search terms.',
  emptyIcon,
  className = '',
  gridClassName = 'space-y-2',
}: SearchableListProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        return false;
      })
    );
  }, [items, searchQuery, searchKeys]);

  return (
    <div className={className}>
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface border border-white/10 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors"
        />
      </div>

      {/* Results */}
      {filteredItems.length > 0 ? (
        <div className={gridClassName}>
          {filteredItems.map((item, index) => renderItem(item, index))}
        </div>
      ) : (
        <div className="border-2 border-lime/20 bg-surface/50 py-12 px-8 text-center">
          {emptyIcon || <Users className="w-10 h-10 text-gray-600 mx-auto mb-4" />}
          <h3 className="font-display text-lg uppercase tracking-tight mb-2">
            {searchQuery ? 'No Results Found' : emptyTitle}
          </h3>
          <p className="text-gray-400 text-sm">
            {searchQuery ? `No results for "${searchQuery}"` : emptyDescription}
          </p>
        </div>
      )}

      {/* Results count */}
      {searchQuery && filteredItems.length > 0 && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          Showing {filteredItems.length} of {items.length} results
        </div>
      )}
    </div>
  );
}
