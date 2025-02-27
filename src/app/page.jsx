import Image from "next/image";
import Navbar from "@/components/navbar";
import LandingPage from "@/components/homepage/LandingPage";
import VissionMission from "@/components/homepage/vision_mission";
import Events from "@/components/homepage/Events";
import Events2 from "@/components/homepage/Events2";
import Research from "@/components/homepage/Research";
import Register202425 from "@/components/homepage/register2024-25";
import Cells_Chapters from "@/components/homepage/Cells_Chapters";
import Affiliations from "@/components/homepage/Affiliations";
import Counts from "@/components/homepage/Counts";
import NavbarMobile from "@/components/navbar_mobile";
import Register2 from "@/components/homepage/register2";
import News from "@/components/homepage/News";

import Footer from "@/components/footer";
export default function Home() {
  return (
    <>

    <LandingPage/>
    <VissionMission/>
    <Events2/>
    <Register2/>
    <News/>
    <Counts/>
    <Research/>
    <Affiliations/>
    {/* <Footer/> */}
    </>
  )
}
