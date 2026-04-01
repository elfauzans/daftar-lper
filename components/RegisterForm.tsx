"use client";

import { useAuthStore } from "@/stores/authStores";
import { motion, AnimatePresence } from "framer-motion";
import { useDaerahStore } from "@/stores/daerahStore";
import { useEffect, useState } from "react";

export default function RegisterForm() {
  const { form, setField, submit, loading, error, success, reset } =
    useAuthStore();

  const {
    provinsi,
    fetchProvinsi,
    setSearch,
    loading: loadingProvinsi,
  } = useDaerahStore();

  const [openProv, setOpenProv] = useState(false);
  const [keyword, setKeyword] = useState("");

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
            submit();
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

          {/* HP */}
          <Input
            label="Nomor HP / WhatsApp"
            value={form.hp}
            onChange={(val) => setField("hp", val)}
          />

          {/* NIK */}
          <Input
            label="NIK"
            value={form.nik}
            onChange={(val) => setField("nik", val)}
          />

          {/* UPLOAD */}
          <div>
            <label className="text-sm font-medium">Upload Foto KTP</label>

            <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center hover:border-green-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setField("ktp", e.target.files?.[0] || null)}
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
        {(success || error) && (
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
              <div className="text-5xl mb-4">{success ? "✅" : "❌"}</div>

              {/* TITLE */}
              <h3 className="text-xl font-bold mb-2">
                {success ? "Berhasil!" : "Gagal"}
              </h3>

              {/* MESSAGE */}
              <p className="text-gray-600 mb-6">
                {success
                  ? "Pendaftaran berhasil, silakan tunggu approval."
                  : error}
              </p>

              {/* BUTTON */}
              <button
                onClick={reset}
                className={`w-full py-3 rounded-xl text-white ${
                  success
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
