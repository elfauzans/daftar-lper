"use client";

import { useAuthStore } from "@/stores/authStores";
import { motion, AnimatePresence } from "framer-motion";
import { useDaerahStore } from "@/stores/daerahStore";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export const metadata = {
  title: "Daftar Anggota Koperasi",
  description:
    "Isi form pendaftaran anggota koperasi LPER secara online dengan mudah.",
};

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // resize max width (biar ga gede banget)
        const MAX_WIDTH = 1000;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        // compress quality
        let quality = 0.8;

        const compressLoop = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) return;

              // kalau masih > 3MB, turunin quality
              if (blob.size > 3 * 1024 * 1024 && quality > 0.3) {
                quality -= 0.1;
                compressLoop();
              } else {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                });
                resolve(compressedFile);
              }
            },
            "image/jpeg",
            quality,
          );
        };

        compressLoop();
      };
    };
  });
}

export default function RegisterForm() {
  const { form, setField, submit, loading, error, status, reset } =
    useAuthStore();
  const [openConfirm, setOpenConfirm] = useState(false);

  const sigRef = useRef<SignatureCanvas | null>(null);

  const {
    provinsi,
    fetchProvinsi,
    setSearch,
    loading: loadingProvinsi,
  } = useDaerahStore();

  const [openProv, setOpenProv] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [openLoading, setOpenLoading] = useState(false);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    fetchProvinsi();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest(".provinsi-dropdown")) {
        setOpenProv(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const minDate = "1945-01-01";

  return (
    <section id="daftar" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Form Pendaftaran Anggota</h2>
          <p className="text-gray-500">
            Isi data dengan lengkap untuk bergabung
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.nik || form.nik.length !== 16) {
              alert("NIK harus 16 digit angka!");
              return;
            }
            if (!form.hp || form.hp.length < 10 || form.hp.length > 14) {
              alert("Nomor HP harus 10–13 digit angka!");
              return;
            }

            if (!form.signature) {
              alert("Tanda tangan wajib diisi!");
              return;
            }

            if (!form.gender) {
              alert("Pilih jenis kelamin!");
              return;
            }

            setOpenConfirm(true);
          }}
          className="space-y-6 bg-gray-50 p-6 rounded-2xl shadow-sm"
        >
          {/* NAMA */}
          <Input
            label="Nama Lengkap"
            value={form.nama}
            onChange={(val) => setField("nama", val)}
          />

          {/* TANGGAL */}
          <div>
            <label className="text-sm font-medium">Tanggal Lahir</label>
            <input
              type="date"
              value={form.tanggal_lahir || ""}
              onChange={(e) => setField("tanggal_lahir", e.target.value)}
              min={minDate}
              max={today}
              className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* ALAMAT */}
          <Textarea
            label="Alamat"
            value={form.alamat}
            onChange={(val) => setField("alamat", val)}
          />

          {/* PROVINSI */}
          <div className="relative provinsi-dropdown">
            <label className="text-sm font-medium">Provinsi</label>

            {/* INPUT SEARCH */}
            <input
              type="text"
              value={keyword}
              placeholder="Cari provinsi..."
              onFocus={() => setOpenProv(true)}
              onChange={(e) => {
                const val = e.target.value;

                setKeyword(val);
                setSearch(val);

                if (typingTimeout) clearTimeout(typingTimeout);

                const timeout = setTimeout(() => {
                  fetchProvinsi();
                }, 400);

                setTypingTimeout(timeout);
              }}
              className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
            />

            {/* DROPDOWN */}
            {openProv && (
              <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">
                {loadingProvinsi ? (
                  <div className="p-3 text-gray-500">Loading...</div>
                ) : provinsi.length === 0 ? (
                  <div className="p-3 text-gray-500">Tidak ditemukan</div>
                ) : (
                  provinsi.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setField("provinsi", item.nama_provinsi);
                        setKeyword(item.nama_provinsi);
                        setOpenProv(false);
                      }}
                      className="p-3 hover:bg-green-50 cursor-pointer text-sm"
                    >
                      {item.nama_provinsi}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* PEKERJAAN */}
          <Input
            label="Pekerjaan"
            value={form.pekerjaan}
            onChange={(val) => setField("pekerjaan", val)}
          />

          <div>
            <label className="text-sm font-medium">Nomor HP / WhatsApp</label>

            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={form.hp}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");

                if (val.startsWith("08")) {
                  val = "628" + val.slice(2);
                }

                // 🔥 hanya angka
                val = val.replace(/\D/g, "");

                // 🔥 max 13 digit
                if (val.length > 14) return;

                setField("hp", val);
              }}
              className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Contoh: 081234567890"
              required
            />

            {/* VALIDASI MESSAGE */}
            {form.hp && (form.hp.length < 10 || form.hp.length > 14) && (
              <p className="text-red-500 text-sm mt-1">
                Nomor HP harus 10–13 digit angka
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Masukkan email Anda"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Jenis Kelamin</label>

            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="L"
                  checked={form.gender === "L"}
                  onChange={(e) => setField("gender", e.target.value)}
                />
                Laki-laki
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="P"
                  checked={form.gender === "P"}
                  onChange={(e) => setField("gender", e.target.value)}
                />
                Perempuan
              </label>
            </div>
          </div>

          {/* NIK */}
          <div>
            <label className="text-sm font-medium">NIK</label>

            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={form.nik}
              onChange={(e) => {
                let val = e.target.value;

                // 🔥 HANYA ANGKA
                val = val.replace(/\D/g, "");

                // 🔥 MAX 16 DIGIT
                if (val.length > 16) return;

                setField("nik", val);
              }}
              className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Masukkan 16 digit NIK"
              required
            />

            {/* VALIDASI MESSAGE */}
            {form.nik && form.nik.length !== 16 && (
              <p className="text-red-500 text-sm mt-1">
                NIK harus 16 digit angka
              </p>
            )}
          </div>

          {/* UPLOAD */}
          <div>
            <label className="text-sm font-medium">Upload Foto KTP</label>

            <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center hover:border-green-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  // ✅ VALIDASI SIZE AWAL (sebelum compress)
                  if (file.size > 5 * 1024 * 1024) {
                    alert("File terlalu besar! Maksimal 5MB.");
                    return;
                  }

                  // ✅ VALIDASI TYPE
                  if (!file.type.startsWith("image/")) {
                    alert("File harus berupa gambar!");
                    return;
                  }

                  // ✅ COMPRESS
                  const compressed = await compressImage(file);

                  // ✅ VALIDASI HASIL COMPRESS
                  if (compressed.size > 3 * 1024 * 1024) {
                    alert(
                      "Gagal mengkompres gambar di bawah 3MB, coba gambar lain.",
                    );
                    return;
                  }

                  setField("ktp", compressed);
                }}
                className="hidden"
                id="ktpUpload"
              />

              <label htmlFor="ktpUpload" className="cursor-pointer">
                <p className="text-gray-500">Klik untuk upload / drag file</p>
                <p className="text-xs text-gray-400 mt-1">
                  JPG / PNG (Max 5MB)
                </p>
              </label>
            </div>

            {form.ktp && (
              <div className="mt-3">
                <p className="text-sm text-green-600">✔ {form.ktp.name}</p>
                <img
                  src={URL.createObjectURL(form.ktp)}
                  className="mt-2 w-32 rounded-lg border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Tanda Tangan</label>

            <div className="mt-3 border rounded-lg p-3">
              <SignatureCanvas
                ref={sigRef}
                penColor="black"
                backgroundColor="white"
                onEnd={() => {
                  if (!sigRef.current) return;

                  if (!sigRef.current.isEmpty()) {
                    const dataUrl = sigRef.current
                      .getTrimmedCanvas()
                      .toDataURL("image/png");

                    setField("signature", dataUrl);
                  }
                }}
                canvasProps={{
                  className: "border rounded-lg w-full h-52 bg-white",
                }}
              />

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    sigRef.current?.clear();
                    setField("signature", ""); // 🔥 penting
                  }}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Clear
                </button>
              </div>
            </div>

            {!form.signature && (
              <p className="text-red-500 text-sm mt-2">
                Tanda tangan wajib diisi
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
          >
            {loading ? "Loading..." : "Kirim Pendaftaran"}
          </button>
        </form>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {(status || error) && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl"
            >
              {/* ICON */}
              <div className="text-5xl mb-4">{status ? "✅" : "❌"}</div>

              {/* TITLE */}
              <h3 className="text-xl font-bold mb-2">
                {status ? "Berhasil!" : "Gagal"}
              </h3>

              {/* MESSAGE */}
              <p className="text-gray-600 mb-6">
                {status
                  ? "Pendaftaran berhasil, silakan tunggu approval."
                  : error}
              </p>

              {/* BUTTON */}
              <button
                onClick={reset}
                className={`w-full py-3 rounded-xl text-white ${
                  status
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin data sudah benar?</AlertDialogTitle>
            <AlertDialogDescription>
              Pastikan semua data yang Anda isi sudah sesuai sebelum dikirim.
              Data tidak dapat diubah setelah dikirim.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction
              onClick={async () => {
                setOpenConfirm(false);
                setOpenLoading(true); // 🔥 tampilkan loading

                try {
                  await submit(); // pastikan submit async
                } finally {
                  setOpenLoading(false); // 🔥 hilangin loading
                }
              }}
              className="bg-green-500 hover:bg-green-600"
            >
              Ya, Kirim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openLoading}>
        <AlertDialogContent className="flex flex-col items-center justify-center text-center gap-4">
          {/* Spinner */}
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />

          <AlertDialogTitle>Memproses...</AlertDialogTitle>

          <AlertDialogDescription>
            Mohon tunggu, data Anda sedang dikirim.
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

/* ================= COMPONENT KECIL BIAR CLEAN ================= */

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
        required
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
        required
      />
    </div>
  );
}
