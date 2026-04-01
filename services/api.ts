import axios, { AxiosError } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "x-username": USERNAME || "",
    "x-password": PASSWORD || "",
  },
});

interface ApiError {
  success?: boolean;
  message?: string;
}

const handleError = (err: unknown): never => {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ApiError>;

    throw (
      axiosError.response?.data || {
        message: axiosError.message || "Terjadi kesalahan",
      }
    );
  }

  throw { message: "Unknown error" };
};
