import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Snippet, type Category } from '@/types';
import { FileCode, Terminal, Globe, Database, Cog } from 'lucide-react';

interface SnippetStore {
  snippets: Snippet[];
  categories: Category[];
  addSnippet: (snippet: Omit<Snippet, 'id' | 'dateCreated'>) => void;
  updateSnippet: (id: string, snippet: Partial<Snippet>) => void;
  deleteSnippet: (id: string) => void;
  searchSnippets: (params: { query: string; category?: string; tag?: string }) => Snippet[];
}

const defaultCategories: Category[] = [
  { id: 'javascript', name: 'JavaScript', icon: 'FileCode' },
  { id: 'typescript', name: 'TypeScript', icon: 'FileCode' },
  { id: 'shell', name: 'Shell', icon: 'Terminal' },
  { id: 'html', name: 'HTML', icon: 'Globe' },
  { id: 'sql', name: 'SQL', icon: 'Database' },
  { id: 'config', name: 'Config', icon: 'Cog' },
];

export const useStore = create<SnippetStore>()(
  persist(
    (set, get) => ({
      snippets: [],
      categories: defaultCategories,
      addSnippet: (snippetData) => {
        const newSnippet = {
          ...snippetData,
          id: crypto.randomUUID(),
          dateCreated: new Date().toISOString(),
        };
        set((state) => ({
          snippets: [...state.snippets, newSnippet],
        }));
      },
      updateSnippet: (id, updatedData) => {
        set((state) => ({
          snippets: state.snippets.map((snippet) =>
            snippet.id === id ? { ...snippet, ...updatedData } : snippet
          ),
        }));
      },
      deleteSnippet: (id) => {
        set((state) => ({
          snippets: state.snippets.filter((snippet) => snippet.id !== id),
        }));
      },
      searchSnippets: ({ query, category, tag }) => {
        const snippets = get().snippets;
        return snippets.filter((snippet) => {
          const matchesQuery =
            query === '' ||
            snippet.title.toLowerCase().includes(query.toLowerCase()) ||
            snippet.description.toLowerCase().includes(query.toLowerCase());
          const matchesCategory = !category || snippet.category === category;
          const matchesTag = !tag || snippet.tags.includes(tag);
          return matchesQuery && matchesCategory && matchesTag;
        });
      },
    }),
    {
      name: 'snippet-store',
    }
  )
);