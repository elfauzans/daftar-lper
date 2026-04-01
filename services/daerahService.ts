import { api } from "./api";

export interface Provinsi {
  id: string;
  nama_provinsi: string;
}

export interface ProvinsiResponse {
  status: boolean;
  message: string;
  data: {
    pagination: {
      page: number;
      per_page: number;
      total: number;
      total_page: number;
    };
    rows: Provinsi[];
  };
}

export const getProvinsiService = async (
  search = "",
  page = 1,
): Promise<ProvinsiResponse> => {
  try {
    const res = await api.get("/provinsi", {
      params: { search, page },
    });

    return res.data;
  } catch (err: unknown) {
    throw (
      (err as { message?: string }) || {
        message: "Gagal mengambil data provinsi",
      }
    );
  }
};
