import About from "@/components/About";
import Banner from "@/components/Banner";
import GallerySection from "@/components/Gallery";
import LabTested from "@/components/LabTested";
import ProductSection from "@/components/Product";
import SacredMission from "@/components/SacredMission";

export default function Home() {
  return (
    <>
      <Banner />
      <ProductSection />
      <GallerySection />
      <About />
      <SacredMission />
      <LabTested />
    </>
  );
}
