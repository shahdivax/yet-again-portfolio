import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[var(--accent)] selection:text-[var(--background)] relative">
      <CustomCursor />
      <div className="hidden dark:block industrial-bg"></div>

      <Navbar />
      <main className="flex flex-col items-center w-full relative z-10 transition-colors duration-1000">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
