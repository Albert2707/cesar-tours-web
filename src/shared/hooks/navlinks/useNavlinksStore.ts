import { create } from "zustand";

interface NavlinksStore {
    navlink: { home: boolean, booking: boolean, aboutUs: boolean, contact: boolean }
}

interface Actions {
    setNavlink: (navlink: { home: boolean, booking: boolean, aboutUs: boolean, contact: boolean }) => void
}

export const useNavlinksStore = create<NavlinksStore & Actions>((set) => (
    {
        navlink: { home: false, booking: false, aboutUs: false, contact: false },
        setNavlink: (navlink) => {
            set({ navlink })
        }
    }
))