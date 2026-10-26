import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";

// Home page: each section is its own component; featured projects arrive with the database stage
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
    </>
  );
}
