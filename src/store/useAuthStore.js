import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create(
    persist(
        (set) => ({
            user: {},
            isLoggedIn: false,
            setUser: (user) => set(() => ({ user })),
            setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
        }),
        {
            name: "kreed-user-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);


export const useOnboardingStore = create(
    persist(
        (set) => ({
            onboardingCompleted: false,
            setOnboardingCompleted: (status) => set({ onboardingCompleted: status }),
        }),
        {
            name: "onboarding-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)