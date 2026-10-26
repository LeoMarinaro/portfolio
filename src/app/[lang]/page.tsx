import About from "@/components/home/About";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";

// Home page: each section is its own component
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <About />
      <Skills />
    </>
  );
}
