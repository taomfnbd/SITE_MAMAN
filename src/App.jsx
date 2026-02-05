import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async'; // Import du provider SEO
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { CMSProvider } from './cms/CMSContext';
import CMSToolbar from './cms/CMSToolbar';
import ToastContainer from './cms/ToastContainer';
import Footer from './components/Footer';
import Home from './pages/Home';
// Import pages
import AdminLogin from './pages/AdminLogin';
import Ateliers from './pages/ateliers/Ateliers';
import Actu from './pages/blog/Actu';
import ArticlePage from './pages/blog/ArticlePage';
import Blog from './pages/blog/Blog';
import Journal from './pages/blog/Journal';
import Contact from './pages/Contact';
import Formations from './pages/formations/Formations';
import MentionsLegales from './pages/MentionsLegales';
import Methode from './pages/methode/Methode';
import Parcours from './pages/methode/Parcours';
import Seances from './pages/methode/Seances';
import Lectures from './pages/ressources/Lectures';
import Liens from './pages/ressources/Liens';
import Ressources from './pages/ressources/Ressources';

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
            <div className="flex-grow">
              <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Pratique Manuelle */}
              <Route path="/pratique-manuelle" element={<Methode />} />
              <Route path="/pratique-manuelle/seances" element={<Seances />} />

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
              <Route path="/a-propos" element={<Parcours />} />
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
