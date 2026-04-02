import { create } from "zustand";
import { registerService, RegisterPayload } from "@/services/registrasiService";

interface AuthState {
  form: RegisterPayload;
  loading: boolean;
  status: boolean;
  error: string | null;

  setField: (name: keyof RegisterPayload, value: string | File | null) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

const initialForm: RegisterPayload = {
  nama: "",
  tanggal_lahir: "",
  alamat: "",
  provinsi: "",
  pekerjaan: "",
  hp: "",
  nik: "",
  gender: "L", // default bisa L / kosong juga boleh
  signature: "", // base64
  ktp: null,
};

export const useAuthStore = create<AuthState>((set, get) => ({
  form: initialForm,
  loading: false,
  status: false,
  error: null,

  // ================= SET FIELD =================
  setField: (name, value) => {
    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    }));
  },

  // ================= SUBMIT =================
  submit: async () => {
    const { form } = get();

    set({ loading: true, error: null, status: false });

    try {
      const res = await registerService(form);

      if (res.status) {
        set({
          status: true,
          form: initialForm,
        });
      } else {
        set({
          error: res.message,
        });
      }
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message || "Terjadi kesalahan";

      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  // ================= RESET =================
  reset: () => set({ form: initialForm, status: false, error: null }),
}));
