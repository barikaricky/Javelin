import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CookieConsent from './components/common/CookieConsent';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import OurSites from './pages/OurSites';
import Gallery from './pages/Gallery';
import Recruitment from './pages/Recruitment';
import Contact from './pages/Contact';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Team from './pages/Team';
import BookMeeting from './pages/BookMeeting';
import NotFound from './pages/NotFound';

// Admin imports
import { AuthProvider } from './context/AuthContext';
import {
  Login,
  Register,
  AdminLayout,
  Dashboard,
  TeamManager,
  SitesManager,
  GalleryManager,
  NewsManager,
  MessagesManager,
  ContactInfoManager,
  AppointmentsManager,
  ProtectedRoute
} from './admin';

// Layout wrapper to conditionally show header/footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return children;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/sites" element={<OurSites />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/team" element={<Team />} />
              <Route path="/book-meeting" element={<BookMeeting />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/register" element={<Register />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="appointments" element={<AppointmentsManager />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="sites" element={<SitesManager />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="news" element={<NewsManager />} />
                <Route path="messages" element={<MessagesManager />} />
                <Route path="contact-info" element={<ContactInfoManager />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
