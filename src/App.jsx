import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import HomePage from "@/pages/HomePage";
import CollectionPage from "@/pages/CollectionPage";
import ArtworkPage from "@/pages/ArtworkPage";
import CollectionsListPage from "@/pages/CollectionsListPage";
import CollectionDetailPage from "@/pages/CollectionDetailPage";
import ArtistsPage from "@/pages/ArtistsPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

export default function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" && <SplashScreen />}
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collections" element={<CollectionsListPage />} />
          <Route path="/collections/:id" element={<CollectionDetailPage />} />
          <Route path="/artwork/:id" element={<ArtworkPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
