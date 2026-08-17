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
import ForArtistsPage from "@/pages/ForArtistsPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import CheckoutSuccessPage from "@/pages/CheckoutSuccessPage";

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
          <Route path="/for-artists" element={<ForArtistsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
