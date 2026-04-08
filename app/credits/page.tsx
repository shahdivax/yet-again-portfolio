import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import Credits from "../../components/Credits";

export default function CreditsPage() {
  return (
    <div className="min-h-screen text-[var(--foreground)] font-sans selection:bg-[var(--accent)] selection:text-[var(--background)] relative bg-transparent">
      <CustomCursor />

      <Navbar />
      <main className="flex flex-col items-center w-full relative z-10 transition-colors duration-1000 min-h-[80vh]">
        <Credits />
      </main>
      <Footer />
    </div>
  );
}
