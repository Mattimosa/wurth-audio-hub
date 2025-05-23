
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchContent } from "../lib/podcastUtils";
import { Headphones, Podcast } from "lucide-react";

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<{
    series: any[];
    episodes: any[];
  }>({ series: [], episodes: [] });
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = React.useState(false);

  // Throttle search to prevent too many requests
  const throttleTimeout = React.useRef<NodeJS.Timeout | null>(null);
  
  const performSearch = React.useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults({ series: [], episodes: [] });
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchContent(searchQuery);
      setResults(data);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  React.useEffect(() => {
    if (throttleTimeout.current) {
      clearTimeout(throttleTimeout.current);
    }

    if (query) {
      throttleTimeout.current = setTimeout(() => {
        performSearch(query);
      }, 300);
    } else {
      setResults({ series: [], episodes: [] });
    }

    return () => {
      if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
    };
  }, [query, performSearch]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (item: any, type: 'series' | 'episode') => {
    setOpen(false);
    if (type === 'series') {
      navigate(`/series/${item.slug}`);
    } else if (type === 'episode') {
      navigate(`/series/${item.series?.slug}/${item.id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-400 rounded-md hover:text-gray-300 transition-colors bg-wurth-gray border border-gray-700"
      >
        <span>Cerca podcast...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-700 bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Cerca podcast o episodi..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isSearching && (
            <div className="p-4 text-sm text-center text-gray-400">
              Ricerca in corso...
            </div>
          )}
          
          <CommandEmpty>
            {query ? "Nessun risultato trovato." : "Inizia a digitare per cercare."}
          </CommandEmpty>
          
          {results.series.length > 0 && (
            <CommandGroup heading="Serie podcast">
              {results.series.map((series) => (
                <CommandItem
                  key={series.id}
                  onSelect={() => handleSelect(series, 'series')}
                  className="flex items-center"
                >
                  <Podcast className="mr-2 h-4 w-4 text-wurth-red" />
                  <span>{series.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {results.episodes.length > 0 && (
            <CommandGroup heading="Episodi">
              {results.episodes.map((episode) => (
                <CommandItem
                  key={episode.id}
                  onSelect={() => handleSelect(episode, 'episode')}
                  className="flex items-center"
                >
                  <Headphones className="mr-2 h-4 w-4 text-wurth-red" />
                  <span>{episode.title}</span>
                  {episode.series && (
                    <span className="ml-2 text-sm text-gray-400">
                      – {episode.series.title}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
