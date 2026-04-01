export default function Footer() {
  return (
    <footer className="bg-[#243b6b] text-white pt-20 pb-10 mt-32 rounded-t-[40px] shadow-inner">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* LOGO */}
        <div className="flex justify-center gap-4 mb-6">
          <img src="/logo_lper.png" className="w-16 h-16 object-contain" />
          <img src="/logo-koperasi.png" className="w-16 h-16 object-contain" />
        </div>

        {/* HEADLINE */}
        <h2 className="text-xl md:text-2xl font-semibold mb-3">
          Bergabung Menjadi Anggota Koperasi LPER
        </h2>

        {/* DESC */}
        <p className="text-gray-200 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Jadilah bagian dari koperasi yang mendukung pertumbuhan ekonomi
          rakyat. Daftarkan diri Anda sekarang dan nikmati berbagai manfaat
          keanggotaan yang transparan, aman, dan terpercaya.
        </p>

        {/* CTA BUTTON */}
        <div className="mt-8">
          <a
            href="#daftar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white hover:bg-white hover:text-[#243b6b] transition-all duration-300 font-semibold"
          >
            Daftar Sekarang →
          </a>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/30 my-10"></div>

        {/* INFO GRID */}
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-200">
          <div>
            <h4 className="font-semibold mb-2">Proses Mudah</h4>
            <p>Pendaftaran cepat dan tanpa ribet langsung dari website.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Aman & Terpercaya</h4>
            <p>Data Anda dijaga dengan sistem keamanan terbaik.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support Aktif</h4>
            <p>Tim kami siap membantu proses pendaftaran Anda.</p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 text-xs text-gray-300">
          © {new Date().getFullYear()} Koperasi Produsen Usaha LPER. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
