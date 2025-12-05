import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PageLoader from './components/common/PageLoader';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CookieConsent from './components/common/CookieConsent';
import ChatBot from './components/common/ChatBot';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import OurSites from './pages/OurSites';
import Gallery from './pages/Gallery';
import Recruitment from './pages/Recruitment';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminForm from './pages/admin/AdminForm';

// Layout component for public pages
const PublicLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
    <CookieConsent />
    <ChatBot />
  </>
);

// Main App Routes
const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <PageLoader />
      <div className="App">
        <Routes>
          {/* Admin Routes - No Header/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/activities/new" element={<AdminForm type="activities" />} />
          <Route path="/admin/activities/edit/:id" element={<AdminForm type="activities" />} />
          <Route path="/admin/bonuses/new" element={<AdminForm type="bonuses" />} />
          <Route path="/admin/bonuses/edit/:id" element={<AdminForm type="bonuses" />} />
          <Route path="/admin/team/new" element={<AdminForm type="team" />} />
          <Route path="/admin/team/edit/:id" element={<AdminForm type="team" />} />
          <Route path="/admin/guards/new" element={<AdminForm type="guards" />} />
          <Route path="/admin/guards/edit/:id" element={<AdminForm type="guards" />} />
          <Route path="/admin/gallery/new" element={<AdminForm type="gallery" />} />
          <Route path="/admin/gallery/edit/:id" element={<AdminForm type="gallery" />} />

          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/sites" element={<PublicLayout><OurSites /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/recruitment" element={<PublicLayout><Recruitment /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
