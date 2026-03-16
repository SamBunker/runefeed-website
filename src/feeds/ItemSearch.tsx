import { useState, useMemo } from 'react';
import type { Alert, Prediction } from '../types';

interface ItemSearchProps {
  alerts: Alert[];
  predictions: Prediction[];
  selected: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
}

export function ItemSearch({ alerts, predictions, selected, onAdd, onRemove }: ItemSearchProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const allItems = useMemo(() => {
    const names = new Set<string>();
    for (const a of alerts) names.add(a.itemName);
    for (const p of predictions) names.add(p.itemName);
    return Array.from(names).sort();
  }, [alerts, predictions]);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 20);
    const q = query.toLowerCase();
    return allItems.filter(name => name.toLowerCase().includes(q)).slice(0, 20);
  }, [query, allItems]);

  const selectedSet = new Set(selected.map(s => s.toLowerCase()));

  return (
    <div className="item-search">
      {selected.length > 0 && (
        <div className="item-chips">
          {selected.map(item => (
            <span key={item} className="item-chip">
              {item}
              <button onClick={() => onRemove(item)}>&times;</button>
            </span>
          ))}
        </div>
      )}
      <div className="item-search-input-wrap">
        <input
          type="text"
          placeholder={allItems.length === 0 ? 'Waiting for feed data...' : 'Search items...'}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          disabled={allItems.length === 0}
        />
        {open && filtered.length > 0 && (
          <div className="item-search-dropdown">
            {filtered.map(name => (
              <button
                key={name}
                className={`item-search-option ${selectedSet.has(name.toLowerCase()) ? 'selected' : ''}`}
                onMouseDown={e => {
                  e.preventDefault();
                  if (!selectedSet.has(name.toLowerCase())) {
                    onAdd(name);
                  }
                  setQuery('');
                }}
              >
                {name}
                {selectedSet.has(name.toLowerCase()) && <span className="text-dim"> (tracked)</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
