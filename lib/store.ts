import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  isLoading: boolean;
  loadingComplete: boolean;
  exitIntentShown: boolean;
  cookieAccepted: boolean;
  scarcitySpots: number;
  setLoading: (loading: boolean) => void;
  setLoadingComplete: (complete: boolean) => void;
  setExitIntentShown: (shown: boolean) => void;
  setCookieAccepted: (accepted: boolean) => void;
  setScarcitySpots: (spots: number) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isLoading: true,
      loadingComplete: false,
      exitIntentShown: false,
      cookieAccepted: false,
      scarcitySpots: 3,
      setLoading: (loading) => set({ isLoading: loading }),
      setLoadingComplete: (complete) => set({ loadingComplete: complete }),
      setExitIntentShown: (shown) => set({ exitIntentShown: shown }),
      setCookieAccepted: (accepted) => set({ cookieAccepted: accepted }),
      setScarcitySpots: (spots) => set({ scarcitySpots: spots }),
    }),
    {
      name: 'oak-code-ui',
      partialize: (state) => ({
        exitIntentShown: state.exitIntentShown,
        cookieAccepted: state.cookieAccepted,
      }),
    }
  )
);

interface ContactFormState {
  step: number;
  formData: {
    name: string;
    email: string;
    phone: string;
    city: string;
    services: string[];
    budget: string;
    timeline: string;
    description: string;
    source: string;
    fileUrl: string;
  };
  setStep: (step: number) => void;
  updateFormData: (data: Partial<ContactFormState['formData']>) => void;
  resetForm: () => void;
}

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  city: '',
  services: [] as string[],
  budget: '',
  timeline: '',
  description: '',
  source: '',
  fileUrl: '',
};

export const useContactFormStore = create<ContactFormState>((set) => ({
  step: 1,
  formData: initialFormData,
  setStep: (step) => set({ step }),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ step: 1, formData: initialFormData }),
}));
