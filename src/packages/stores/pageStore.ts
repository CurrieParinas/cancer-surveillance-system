// stores/pageStore.ts
import { create } from "zustand";

type PageState = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    handleNext: () => void;
    handleBack: () => void;
};

const usePageStore = create<PageState>((set, get) => ({
    currentPage: 1,
    setCurrentPage: (page: number) => set({ currentPage: page }),
    handleNext: () => {
        const { currentPage } = get();
        if (currentPage < 6) {
            set({ currentPage: currentPage + 1 });
        }
    },
    handleBack: () => {
        const { currentPage } = get();
        if (currentPage > 1) {
            set({ currentPage: currentPage - 1 });
        }
    },
}));

export default usePageStore;
