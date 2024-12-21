'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface SnippetListProps {
  onSelectSnippet: (id: string) => void;
  selectedCategory?: string;
}

export function SnippetList({ onSelectSnippet, selectedCategory }: SnippetListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchSnippets } = useStore();

  const filteredSnippets = searchSnippets({
    query: searchQuery,
    category: selectedCategory,
  });

  return (
    <div className="h-full flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search snippets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {filteredSnippets.map((snippet) => (
            <Card
              key={snippet.id}
              className="p-4 cursor-pointer hover:bg-accent"
              onClick={() => onSelectSnippet(snippet.id)}
            >
              <h3 className="font-medium mb-1">{snippet.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {snippet.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-secondary px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}