'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Save, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface SnippetEditorProps {
  snippetId?: string;
}

export function SnippetEditor({ snippetId }: SnippetEditorProps) {
  const { snippets, categories, addSnippet, updateSnippet, deleteSnippet } = useStore();
  const currentSnippet = snippetId ? snippets.find((s) => s.id === snippetId) : null;

  const [title, setTitle] = useState(currentSnippet?.title || '');
  const [description, setDescription] = useState(currentSnippet?.description || '');
  const [language, setLanguage] = useState(currentSnippet?.language || '');
  const [category, setCategory] = useState(currentSnippet?.category || '');
  const [tags, setTags] = useState(currentSnippet?.tags.join(', ') || '');
  const [code, setCode] = useState(currentSnippet?.code || '');

  const handleSave = () => {
    const snippetData = {
      title,
      description,
      language,
      category,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      code,
    };

    if (snippetId) {
      updateSnippet(snippetId, snippetData);
    } else {
      addSnippet(snippetData);
    }
    toast.success('Snippet saved successfully!');
  };

  const handleDelete = () => {
    if (snippetId) {
      deleteSnippet(snippetId);
      toast.success('Snippet deleted successfully!');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  return (
    <Card className="p-6 h-full overflow-y-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Snippet title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your snippet"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="e.g., JavaScript"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, hooks, typescript"
          />
        </div>

        <div>
          <Label htmlFor="code">Code</Label>
          <Textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here"
            className="font-mono min-h-[200px]"
          />
        </div>

        <div className="flex justify-between">
          <div className="space-x-2">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="secondary" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          {snippetId && (
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}