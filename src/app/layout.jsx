import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NavbarMobile from "@/components/navbar_mobile";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.sbce.ac.in"),
  title: {
    default: "Sree Buddha College of Engineering | SBCE – Pattoor, Kerala",
    template: "%s | SBCE",
  },
  description:
    "Sree Buddha College of Engineering (SBCE), Pattoor, Alappuzha, Kerala – an Autonomous institution affiliated to APJ Abdul Kalam Technological University. Offering B.Tech, M.Tech & PhD programmes in Engineering and Technology with NAAC accreditation.",
  keywords: [
    "Sree Buddha College of Engineering",
    "SBCE",
    "engineering college Kerala",
    "BTech college Alappuzha",
    "KTU affiliated college",
    "NAAC accredited college Kerala",
    "autonomous engineering college",
    "Pattoor Nooranad college",
    "MTech Kerala",
    "computer science engineering Kerala",
    "electronics engineering Kerala",
  ],
  authors: [{ name: "Sree Buddha College of Engineering" }],
  creator: "SBCE",
  publisher: "Sree Buddha College of Engineering",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.sbce.ac.in",
    siteName: "Sree Buddha College of Engineering",
    title: "Sree Buddha College of Engineering | SBCE – Pattoor, Kerala",
    description:
      "Premier Autonomous Engineering College in Kerala affiliated to KTU. NAAC accredited. B.Tech, M.Tech & PhD programmes. Located at Pattoor, Alappuzha.",
    images: [
      {
        url: "/assets/images/sree_buddha_college_image1.png",
        width: 1200,
        height: 630,
        alt: "Sree Buddha College of Engineering Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sree Buddha College of Engineering | SBCE",
    description:
      "Autonomous Engineering College in Kerala – B.Tech, M.Tech & PhD. NAAC Accredited. Affiliated to APJ Abdul Kalam Technological University.",
    images: ["/assets/images/sree_buddha_college_image1.png"],
  },
  alternates: {
    canonical: "https://www.sbce.ac.in",
  },
  other: {
    "instagram:url": "https://www.instagram.com/sreebuddha.sbce",
    "linkedin:url": "https://www.linkedin.com/school/sree-buddha-college-pattoor/",
  },
};

export default function RootLayout({ children }) {



  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >

        <div className="page_container">

          <Navbar />
          <NavbarMobile />

          {children}

          <Footer />
        </div>



      </body>
    </html>
  );
}
