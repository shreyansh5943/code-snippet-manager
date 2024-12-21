'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as Icons from 'lucide-react';

interface CategoryNavProps {
  selectedCategory?: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  const { categories } = useStore();

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-2">
        <Button
          variant={!selectedCategory ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onSelectCategory('')}
        >
          <Icons.LayoutGrid className="mr-2 h-4 w-4" />
          All Snippets
        </Button>
        {categories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons];
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => onSelectCategory(category.id)}
            >
              <IconComponent className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}