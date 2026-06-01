import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Mission from "./components/Mission";
import Activities from "./components/Activities";
import Donation from "./components/Donation";
import Volunteer from "./components/Volunteer";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SuccessStories from "./components/SuccessStories";
import ChatBot from "./components/ChatBot";
import Blogs from "./components/Blogs";

export default function App() {

  return (

    <div className="bg-white min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Mission Section */}
      <Mission />

      {/* Activities Section */}
      <Activities />

      {/* Success Stories */}
      <SuccessStories />

      {/* Donation Section */}
      <Donation />

      {/* Volunteer Section */}
      <Volunteer />

      {/* Events Section */}
      <Events />

      {/* Gallery Section */}
      <Gallery />

      {/* Blogs Section */}
      <Blogs />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Chat Bot */}
      <ChatBot />

    </div>

  );
}