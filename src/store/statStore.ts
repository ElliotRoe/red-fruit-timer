import { StateCreator } from 'zustand';

import { AppState } from './index';

type Category = {
    uid: string;
    name: string;
    // Total amount of minutes worked including children
    total: number;
    children: Category[];
    parent: Category | null;
}

export interface StatState {
    rootCategory: Category;
    selectedCategory: Category | null;

    getCategoryTotal: (uid: string) => number | null;
    addCategory: (uid: string, name: string) => void;
    removeCategory: (uid: string) => void;
    renameCategory: (uid: string, newName: string) => void;
    incrementCurrentCategory: () => void;
}

const findCategory = (category: Category, uid: string): Category | null => {
    if (category.uid === uid) {
        return category;
    }

    for (let i = 0; i < category.children.length; i++) {
        const child = category.children[i];
        if (!child) {
            break;
        }
        const found = findCategory(child, uid);
        if (found) {
            return found;
        }
    }

    return null;
}

export const createStatSlice: StateCreator<
    AppState,
    [],
    [],
    StatState
> = (set, get) => ({
    rootCategory: {
        uid: 'root',
        name: 'root',
        total: 0,
        children: [],
        parent: null,
    },

    selectedCategory: null,

    getCategoryTotal: (uid: string) => {
        const category = findCategory(get().rootCategory, uid);
        if (!category) {
            return null;
        }
        return category.total;
    },

    addCategory: (uid: string, name: string) => {
        const category = findCategory(get().rootCategory, uid);
        if (!category) {
            return;
        }
        category.children.push({
            uid,
            name,
            total: 0,
            children: [],
            parent: category,
        });
    },

    removeCategory: (uid: string) => {
        const category = findCategory(get().rootCategory, uid);
        if (!category) {
            return;
        }
        if (!category.parent) {
            return;
        }
        const index = category.parent.children.findIndex((child) => child.uid === uid);
        if (index === -1) {
            return;
        }
        category.parent.children.splice(index, 1);
    },

    renameCategory: (uid: string, newName: string) => {
        const category = findCategory(get().rootCategory, uid);
        if (!category) {
            return;
        }
        category.name = newName;
    },

    incrementCurrentCategory: () => {
        if (!get().selectedCategory) {
            return;
        }
        set((state) => {
            if (!state.selectedCategory) {
                return { selectedCategory: null };
            }
            return { selectedCategory: {
                ...state.selectedCategory,
                total: state.selectedCategory.total + 1,
            }};
        });
    }
})