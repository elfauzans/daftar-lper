import { api } from "./api";

// ================= TYPES =================
export interface RegisterPayload {
  nama: string;
  tanggal_lahir: string;
  alamat: string;
  provinsi: string;
  pekerjaan: string;
  hp: string;
  nik: string;
  ktp: File | null;
}

export interface RegisterResponse {
  status: boolean;
  message: string;
}

// ================= SERVICE =================
export const registerService = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  try {
    const formData = new FormData();

    formData.append("nama", payload.nama);
    formData.append("tanggal_lahir", payload.tanggal_lahir);
    formData.append("alamat", payload.alamat);
    formData.append("provinsi", payload.provinsi);
    formData.append("pekerjaan", payload.pekerjaan);
    formData.append("hp", payload.hp);
    formData.append("nik", payload.nik);

    if (payload.ktp) {
      formData.append("ktp", payload.ktp);
    }

    const res = await api.post<RegisterResponse>(
      "/members/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res.data;
  } catch (err) {
    throw err; // sudah dihandle di api.ts
  }
};
