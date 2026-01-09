import About from "@/components/About";
import Banner from "@/components/Banner";
import GallerySection from "@/components/Gallery";
import LabTested from "@/components/LabTested";
import ProductSection from "@/components/Product";
import SacredMission from "@/components/SacredMission";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Home() {
  return (
    <>
      <Banner />
      <ProductSection />
      <GallerySection />
      <SacredMission />
      <About />
      <LabTested />
      <TestimonialCarousel />
    </>
  );
}
