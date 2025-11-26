import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLoader from './components/common/PageLoader';
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
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <PageLoader />
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/sites" element={<OurSites />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
