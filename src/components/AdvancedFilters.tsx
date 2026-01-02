import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface AdvancedFiltersProps {
  allServices: string[];
  allFacilities: string[];
  allActivities: string[];
  selectedServices: string[];
  selectedFacilities: string[];
  selectedActivities: string[];
  onServicesChange: (services: string[]) => void;
  onFacilitiesChange: (facilities: string[]) => void;
  onActivitiesChange: (activities: string[]) => void;
  onClearAll: () => void;
}

// Helper to extract emoji and text
const parseItem = (item: string) => {
  const emojiMatch = item.match(/^(\p{Emoji}+)\s*/u);
  if (emojiMatch) {
    return {
      emoji: emojiMatch[1],
      text: item.slice(emojiMatch[0].length).trim()
    };
  }
  return { emoji: '', text: item };
};

// Group items by first emoji
const groupByEmoji = (items: string[]) => {
  const groups: Record<string, string[]> = {};
  items.forEach(item => {
    const { emoji } = parseItem(item);
    const key = emoji || '📌';
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
};

interface FilterSectionProps {
  title: string;
  icon: string;
  items: string[];
  selectedItems: string[];
  onChange: (items: string[]) => void;
  defaultOpen?: boolean;
}

const FilterSection = React.memo(({ 
  title, 
  icon, 
  items, 
  selectedItems, 
  onChange,
  defaultOpen = false 
}: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    const search = searchTerm.toLowerCase();
    return items.filter(item => item.toLowerCase().includes(search));
  }, [items, searchTerm]);

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      onChange(selectedItems.filter(i => i !== item));
    } else {
      onChange([...selectedItems, item]);
    }
  };

  const selectedCount = selectedItems.length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <span className="font-medium text-sm">{title}</span>
            {selectedCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedCount}
              </Badge>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-3 space-y-2">
          {items.length > 10 && (
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          )}
          <ScrollArea className="max-h-48">
            <div className="space-y-1 pr-4">
              {filteredItems.map((item) => {
                const { emoji, text } = parseItem(item);
                return (
                  <div
                    key={item}
                    className="flex items-center space-x-2 py-1.5 px-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={`filter-${item}`}
                      checked={selectedItems.includes(item)}
                      onCheckedChange={() => toggleItem(item)}
                    />
                    <label
                      htmlFor={`filter-${item}`}
                      className="text-sm leading-none cursor-pointer flex items-center gap-1.5 flex-1"
                    >
                      {emoji && <span>{emoji}</span>}
                      <span className="truncate">{text || item}</span>
                    </label>
                  </div>
                );
              })}
              {filteredItems.length === 0 && (
                <p className="text-sm text-muted-foreground py-2 text-center">
                  No se encontraron resultados
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
});

FilterSection.displayName = 'FilterSection';

export const AdvancedFilters = React.memo(({
  allServices,
  allFacilities,
  allActivities,
  selectedServices,
  selectedFacilities,
  selectedActivities,
  onServicesChange,
  onFacilitiesChange,
  onActivitiesChange,
  onClearAll,
}: AdvancedFiltersProps) => {
  const totalSelected = selectedServices.length + selectedFacilities.length + selectedActivities.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filtros avanzados</h3>
        {totalSelected > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Limpiar ({totalSelected})
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <FilterSection
          title="Servicios"
          icon="🏥"
          items={allServices}
          selectedItems={selectedServices}
          onChange={onServicesChange}
          defaultOpen={selectedServices.length > 0}
        />

        <FilterSection
          title="Instalaciones"
          icon="🏠"
          items={allFacilities}
          selectedItems={selectedFacilities}
          onChange={onFacilitiesChange}
          defaultOpen={selectedFacilities.length > 0}
        />

        <FilterSection
          title="Actividades"
          icon="🎭"
          items={allActivities}
          selectedItems={selectedActivities}
          onChange={onActivitiesChange}
          defaultOpen={selectedActivities.length > 0}
        />
      </div>

      {totalSelected > 0 && (
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {totalSelected} filtro{totalSelected !== 1 ? 's' : ''} aplicado{totalSelected !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
});

AdvancedFilters.displayName = 'AdvancedFilters';
