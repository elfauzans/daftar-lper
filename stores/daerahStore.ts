import { create } from "zustand";
import { getProvinsiService, Provinsi } from "@/services/daerahService";

interface DaerahState {
  provinsi: Provinsi[];
  loading: boolean;
  error: string | null;

  search: string;
  page: number;

  fetchProvinsi: () => Promise<void>;
  setSearch: (val: string) => void;
  setPage: (page: number) => void;
}

export const useDaerahStore = create<DaerahState>((set, get) => ({
  provinsi: [],
  loading: false,
  error: null,

  search: "",
  page: 1,

  // ================= FETCH =================
  fetchProvinsi: async (customSearch?: string) => {
    const { search, page } = get();

    const finalSearch = customSearch ?? search;

    set({ loading: true, error: null });

    try {
      const res = await getProvinsiService(finalSearch, page);

      if (res.status) {
        // ⚠️ juga ini
        set({
          provinsi: res.data.rows,
        });
      } else {
        set({ error: res.message });
      }
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message || "Terjadi kesalahan";

      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  // ================= SEARCH =================
  setSearch: (val) => {
    set({ search: val, page: 1 });
  },

  // ================= PAGE =================
  setPage: (page) => set({ page }),
}));
