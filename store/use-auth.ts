import { authProps } from "@/types";
import { create } from "zustand";

export const UseAuth = create<authProps>((set) => ({
    userid: "",
    setUserid: (userid) => set({ userid }),
    name: "",
    setName: (name) => set({ name }),
    email: "",
    setEmail: (email) => set({ email }),
    role: "",
    setRole: (role) => set({ role }),
    profile_picture: null,
    setProfilePicture: (profile_picture) => set({ profile_picture }),
    shift: null,
    setShift: (shift) => set({ shift }),
}))