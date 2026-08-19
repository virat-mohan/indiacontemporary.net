import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useHashScroll from "@/hooks/useHashScroll";
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
import SoldWorksPage from "@/pages/SoldWorksPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import CheckoutSuccessPage from "@/pages/CheckoutSuccessPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import ShippingPage from "@/pages/ShippingPage";
import PartnershipsPage from "@/pages/PartnershipsPage";
import ApplyPage from "@/pages/ApplyPage";
import ArtistOnboardingPage from "@/pages/ArtistOnboardingPage";
import AdminPage from "@/pages/AdminPage";
import AdminAddArtistPage from "@/pages/AdminAddArtistPage";
import AdminImportPage from "@/pages/AdminImportPage";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname]);

  useHashScroll(location);

  return (
    <>
      {location.pathname === "/" && !location.hash && <SplashScreen />}
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
          <Route path="/for-artists" element={<ForArtistsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/reviews" element={<ArtistReviewsPage />} />
          <Route path="/sold-works" element={<SoldWorksPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/apply/onboarding" element={<ArtistOnboardingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add-artist" element={<AdminAddArtistPage />} />
          <Route path="/admin/import" element={<AdminImportPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
