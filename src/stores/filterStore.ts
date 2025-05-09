import { create } from "zustand";
import { Article } from "../core/types";

type FilterApp = {
  selected: {
    tag: number | null;
    price: number | null;
    query: string
  };
  initApp: () => void;
};

const initState = {
  selected: { tag: null, price: null, query: "" },
} as FilterApp;

export const useFilterStore = create<FilterApp>((set) => ({
  ...initState,
  initApp: () => set(() => initState),
}));

export const filteredArticles = (articles: Article[], category?: number) => {
  const { selected } = useFilterStore.getState();

  return articles.filter((article) => {
    const matchesTag = selected.tag ? article.tags.includes(selected.tag) : true;
    const matchesCategory = category ? article.category === category : true;
    const matchesSearch = article.label.toLowerCase().includes(selected.query.toLowerCase());
    const matchesPrice = selected.price ? article.price <= selected.price : true;
    return matchesTag && matchesCategory && matchesSearch && matchesPrice;
  });
};

export const tagSelect = (id: number | null) => {
  useFilterStore.setState((state) => ({
    selected: { ...state.selected, tag: id === state.selected.tag ? null : id },
  }));
};
export const priceSelect = (value: number | null) => {
  useFilterStore.setState((state) => ({
    selected: { ...state.selected, price: value },
  }));
};
export const setSearchQuery = (value: string) => {
  useFilterStore.setState((state) => ({
    selected: { ...state.selected, query: value },
  }));
};
