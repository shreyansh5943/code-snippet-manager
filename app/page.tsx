'use client';

import { useState } from 'react';
import { CategoryNav } from '@/components/category-nav';
import { SnippetList } from '@/components/snippet-list';
import { SnippetEditor } from '@/components/snippet-editor';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>();

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex items-center justify-between h-14">
          <h1 className="text-xl font-semibold">Code Snippet Manager</h1>
          <div className="flex items-center gap-2">
            <Button onClick={() => setSelectedSnippetId(undefined)}>
              <Plus className="w-4 h-4 mr-2" />
              New Snippet
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-4">
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-4rem)]">
          <ResizablePanel defaultSize={20} minSize={15}>
            <CategoryNav
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={30} minSize={25}>
            <SnippetList
              selectedCategory={selectedCategory}
              onSelectSnippet={setSelectedSnippetId}
            />
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={50}>
            <SnippetEditor snippetId={selectedSnippetId} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}