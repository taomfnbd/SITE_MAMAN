import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Import du provider SEO
import Home from './pages/Home';
import Footer from './components/Footer';
import { CMSProvider } from './cms/CMSContext';
import CMSToolbar from './cms/CMSToolbar';
import ToastContainer from './cms/ToastContainer';
import ResalibBadge from './components/ResalibBadge';

// Import pages
import Methode from './pages/methode/Methode';
import Seances from './pages/methode/Seances';
import Parcours from './pages/methode/Parcours';
import Formations from './pages/formations/Formations';
import Ateliers from './pages/ateliers/Ateliers';
import Ressources from './pages/ressources/Ressources';
import Lectures from './pages/ressources/Lectures';
import Liens from './pages/ressources/Liens';
import Blog from './pages/blog/Blog';
import Actu from './pages/blog/Actu';
import Journal from './pages/blog/Journal';
import ArticlePage from './pages/blog/ArticlePage';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';
import AdminLogin from './pages/AdminLogin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <CMSProvider>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <CMSToolbar />
            <ToastContainer />
            <ResalibBadge visible={true} />
            <div className="flex-grow">
              <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Méthode */}
              <Route path="/methode" element={<Methode />} />
              <Route path="/methode/seances" element={<Seances />} />
              <Route path="/methode/parcours" element={<Parcours />} />

              {/* Formations */}
              <Route path="/formations" element={<Formations />} />

              {/* Ateliers */}
              <Route path="/ateliers" element={<Ateliers />} />

              {/* Ressources */}
              <Route path="/ressources" element={<Ressources />} />
              <Route path="/ressources/lectures" element={<Lectures />} />
              <Route path="/ressources/liens" element={<Liens />} />
              
              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/actu" element={<Actu />} />
              <Route path="/blog/journal" element={<Journal />} />
              <Route path="/blog/article/:id" element={<ArticlePage />} />

              {/* Pages Globales */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/admin" element={<AdminLogin />} />
            </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </CMSProvider>
  );
}

export default App;
