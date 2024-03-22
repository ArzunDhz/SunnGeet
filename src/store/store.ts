import { create } from 'zustand';

interface SearchBoxInputState
{
    input: string | null;
    setInput: (text: string) => void;
    showSuggestion: boolean;
    toggleSuggestion: (show: boolean) => void;
}

export const useSearchInput = create<SearchBoxInputState>((set) => ({
    input: null,
    setInput: (text: string) => set({ input: text }),
    toggleSuggestion: (show: boolean) => set({ showSuggestion: show }),
    showSuggestion: false
}));
