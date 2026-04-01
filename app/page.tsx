// src/app/page.tsx
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";
import WhatsappButton from "@/components/WhatsappButton";

export default function Home() {
  return (
    <main>
      <Navbar />
      <WhatsappButton />
      <Hero />
      <RegisterForm />
      <Footer />
    </main>
  );
}
