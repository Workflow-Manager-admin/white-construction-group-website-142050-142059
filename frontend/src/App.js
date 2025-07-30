import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import "./App.css";

/*
  Color palette:
    --primary: #23395d (main header, buttons, accents)
    --secondary: #ffffff (backgrounds)
    --accent: #e8b23a (CTA, highlights)
*/

/* ------------------- Data for Gallery and Testimonials ------------------ */

// Sample testimonials
const TESTIMONIALS = [
  {
    name: "Michael Robertson",
    title: "CEO, BuildRight",
    quote: "J. White Construction Group exceeded our expectations on every project—professional, reliable, and the craftsmanship is unmatched.",
    image: null,
  },
  {
    name: "Emily Tran",
    title: "Homeowner",
    quote: "From planning to completion, their communication and attention to detail made my renovation stress-free.",
    image: null,
  }
];

// Example gallery/project data
const GALLERY_PROJECTS = [
  {
    id: "1",
    title: "Lakeside Townhouses",
    description: "Multi-unit residential build featuring eco-friendly materials, completed Spring 2023.",
    images: [
      { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", caption: "Elegant exteriors with modern finishes" },
      { url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", caption: "Spacious, light-filled interiors" }
    ]
  },
  {
    id: "2",
    title: "Central Plaza Offices",
    description: "Commercial project - open layouts and sustainable design, delivered in Winter 2022.",
    images: [
      { url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80", caption: "Modern gathering spaces" },
      { url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80", caption: "Bright, productive workspaces" }
    ]
  }
];

// Company history
const COMPANY_HISTORY = [
  "Founded in 1992 by John White, J. White Construction Group started as a family business in residential renovations.",
  "Over three decades, we've grown into a leading contractor serving businesses and homeowners across the region.",
  "Our commitment to integrity, quality, and long-term client relationships guides every project, large or small."
];

// Contact info (footer)
const CONTACT_INFO = {
  email: "info@jwhiteconstruction.com",
  phone: "(555) 555-3421",
  address: "245 Main Street, Springfield, State",
};

/* ------------------- Header/NavBar ------------------ */

function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <div className="header-content container">
        <Link to="/" className="company-logo">J. White Construction Group</Link>
        <nav>
          <ul className="nav-list">
            <li><Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link></li>
            <li><Link className={location.pathname.startsWith("/gallery") ? "active" : ""} to="/gallery">Gallery</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ------------------- Hero Section ------------------ */

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <img
        className="hero-img"
        src="https://images.unsplash.com/photo-1503389152951-9c3d29a1e166?auto=format&fit=crop&w=1100&q=80"
        alt="Modern construction site"
      />
      <div className="hero-content">
        <h1>Your Vision, Our Foundation</h1>
        <p className="hero-subtitle">Quality construction with integrity &ndash; serving our community since 1992.</p>
        <Link className="btn accent" to="/gallery">View Our Projects</Link>
      </div>
    </section>
  );
}

/* ------------------- Testimonials ------------------ */

function Testimonials() {
  return (
    <section className="testimonials container" aria-label="Testimonials">
      <h2 className="section-title">Testimonials</h2>
      <div className="testimonial-list">
        {TESTIMONIALS.map((t, i) => (
          <blockquote key={i} className="testimonial">
            <p className="testimonial-quote">"{t.quote}"</p>
            <footer>
              <span className="testimonial-author">{t.name}</span>
              <span className="testimonial-title">, {t.title}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

/* ------------------- Company History ------------------ */

function CompanyHistory() {
  return (
    <section className="history container" aria-label="Company History">
      <h2 className="section-title">Our History</h2>
      <ul className="history-list">
        {COMPANY_HISTORY.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------- Landing Page ------------------ */

function LandingPage() {
  return (
    <main>
      <Hero />
      <Testimonials />
      <CompanyHistory />
      {/* Gallery button also in Hero */}
    </main>
  );
}

/* ------------------- Gallery Sidebar ------------------ */

function GallerySidebar({ projects, selectedId, onSelect }) {
  return (
    <aside className="gallery-sidebar">
      <h3>Projects</h3>
      <ul>
        {projects.map(p => (
          <li key={p.id}>
            <button
              className={selectedId === p.id ? "project-btn selected" : "project-btn"}
              onClick={() => onSelect(p.id)}
              aria-current={selectedId === p.id ? "true" : undefined}
            >
              {p.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ------------------- Carousel for Project Images ------------------ */

function ImageCarousel({ images }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;

  const prev = () => setIdx(idx => (idx === 0 ? images.length - 1 : idx - 1));
  const next = () => setIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));

  return (
    <div className="carousel">
      <div className="carousel-image-wrapper">
        <img src={images[idx].url} alt={images[idx].caption || "Project image"} className="carousel-image" />
      </div>
      {images.length > 1 && (
        <div className="carousel-nav">
          <button onClick={prev} className="carousel-arrow" aria-label="Previous image">&lt;</button>
          <span className="carousel-index">{idx + 1} / {images.length}</span>
          <button onClick={next} className="carousel-arrow" aria-label="Next image">&gt;</button>
        </div>
      )}
      {images[idx].caption && <p className="carousel-caption">{images[idx].caption}</p>}
    </div>
  );
}

/* ------------------- Gallery Main Section ------------------ */

function GalleryPage() {
  const [selectedId, setSelectedId] = useState(GALLERY_PROJECTS[0].id);

  const project = GALLERY_PROJECTS.find(p => p.id === selectedId) || GALLERY_PROJECTS[0];

  return (
    <main className="gallery-main">
      <div className="gallery-container container">
        <GallerySidebar
          projects={GALLERY_PROJECTS}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <section className="gallery-content">
          <h2>{project.title}</h2>
          <p className="gallery-description">{project.description}</p>
          <ImageCarousel images={project.images} />
        </section>
      </div>
    </main>
  );
}

/* ------------------- Footer ------------------ */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="contact-info">
          <strong>Contact Us</strong><br />
          <span>{CONTACT_INFO.address}</span><br />
          <span>{CONTACT_INFO.phone}</span><br />
          <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} J. White Construction Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ------------------- App Root and App Layout ------------------ */

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <div className="site-bg">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
