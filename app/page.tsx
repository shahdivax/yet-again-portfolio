import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

export default function Home() {
  return (
    <div className="min-h-screen text-[var(--foreground)] font-sans selection:bg-[var(--accent)] selection:text-[var(--background)] relative bg-transparent">
      <CustomCursor />

      <Navbar />
      <main className="flex flex-col items-center w-full relative z-10 transition-colors duration-1000">
        <Hero />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
