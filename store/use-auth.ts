import { create } from "zustand";

interface AuthProps {
  id: string;
  setId: (id: string) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  role: string;
  setRole: (role: string) => void;
  phone_number: string | null;
  setPhoneNumber: (phone_number: string | null) => void;
  profile_picture: string | null;
  setProfilePicture: (profile_picture: string | null) => void;
  jobdesk: string;
  setJobdesk: (jobdesk: string) => void;
  exp: number | null;
  setExp: (exp: number | null) => void;
  iat: number | null;
  setIat: (iat: number | null) => void;
}

export const useAuthContext = create<AuthProps>((set) => ({
  id: "",
  setId: (id) => set({ id }),
  name: "",
  setName: (name) => set({ name }),
  email: "",
  setEmail: (email) => set({ email }),
  role: "",
  setRole: (role) => set({ role }),
  phone_number: "",
  setPhoneNumber: (phone_number) => set({ phone_number }),
  profile_picture: "",
  setProfilePicture: (profile_picture) => set({ profile_picture }),
  jobdesk: "",
  setJobdesk: (jobdesk) => set({ jobdesk }),
  iat: null,
  setIat: (iat) => set({ iat }),
  exp: null,
  setExp: (exp) => void { exp },
}));
