import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import HomePage from "@/pages/HomePage";
import ArtworksPage from "@/pages/ArtworksPage";
import ArtworkPage from "@/pages/ArtworkPage";
import CollectionsListPage from "@/pages/CollectionsListPage";
import CollectionDetailPage from "@/pages/CollectionDetailPage";
import ArtistsPage from "@/pages/ArtistsPage";
import ArtistDetailPage from "@/pages/ArtistDetailPage";
import ForArtistsPage from "@/pages/ForArtistsPage";
import AboutPage from "@/pages/AboutPage";
import FounderPage from "@/pages/FounderPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import NewsPage from "@/pages/NewsPage";
import ArtistReviewsPage from "@/pages/ArtistReviewsPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import CheckoutSuccessPage from "@/pages/CheckoutSuccessPage";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // /for-artists is the only URL currently being shared (offline, direct link
  // to potential artists) — it renders standalone with no nav/footer/splash
  // and no links out to the rest of the site, which isn't live yet.
  if (location.pathname === "/for-artists") {
    return <ForArtistsPage />;
  }

  return (
    <>
      {location.pathname === "/" && <SplashScreen />}
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artworks" element={<ArtworksPage />} />
          <Route path="/collections" element={<CollectionsListPage />} />
          <Route path="/collections/:id" element={<CollectionDetailPage />} />
          <Route path="/artwork/:id" element={<ArtworkPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artists/:id" element={<ArtistDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/reviews" element={<ArtistReviewsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
