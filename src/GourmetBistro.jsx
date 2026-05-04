import './GourmetBistro.css';

const GourmetBistro = () => {
  return (
    <div className="gourmet-bistro">
      <header>
        <a href="#" className="brand">GOLDEN BISTRO</a>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#menu">Our Menu</a></li>
        </ul>
        <button className="btn-book" onClick={() => document.getElementById('location').scrollIntoView({ behavior: 'smooth' })}>Book a Table</button>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Lavors That Delight,<br/>Moments That Last</h1>
        </div>
      </section>

      <section className="quality-section">
        <div className="quality-images">
          <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800" alt="Meat dish" />
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" alt="Plated dish" />
          <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800" alt="Gourmet dish" />
        </div>
        <div className="quality-text">
          <h2>Quality Cuisine<br/>Made with Passion</h2>
          <p>Every dish is an expression of culinary art, crafted with the finest ingredients to create an unforgettable dining experience. Discover a journey of taste that celebrates both tradition and innovation.</p>
        </div>
      </section>

      <section className="features">
        <div className="feature-item">
          <div className="feature-number">01</div>
          <div className="feature-text">
            <h3>Taste the best of local and international cuisine</h3>
            <p>Our chefs masterfully blend regional flavors with global techniques to bring you exceptional dishes.</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-number">02</div>
          <div className="feature-text">
            <h3>Serving delicious moments every day</h3>
            <p>We pride ourselves on providing a warm, inviting atmosphere where every meal becomes a cherished memory.</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-number">03</div>
          <div className="feature-text">
            <h3>Perfect ambiance for any occasion</h3>
            <p>Whether a romantic dinner or a family gathering, our bistro offers the ideal setting.</p>
          </div>
        </div>
      </section>

      <section className="banner">
        <div className="banner-text">
          <h2>Lavors That<br/>Delight, Moments<br/>That Last</h2>
          <button className="btn-book" style={{ marginTop: '1rem' }} onClick={() => document.getElementById('location').scrollIntoView({ behavior: 'smooth' })}>Book a Table</button>
        </div>
        <div className="banner-images">
          <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800" alt="Couple dining" />
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" alt="Pouring wine" />
        </div>
      </section>

      <section className="dishes-section" id="menu">
        <div className="dishes-header">
          <h2>Our dishes</h2>
          <div className="dishes-nav">
            <span className="active">MAIN COURSES</span>
          </div>
        </div>

        <div className="dishes-grid">
          <div className="dish-card">
            <div className="dish-img-wrapper">
              <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800" alt="Filet Mignon" />
            </div>
            <h3>Filet Mignon</h3>
          </div>
          <div className="dish-card">
            <div className="dish-img-wrapper">
              <img src="https://images.unsplash.com/photo-1553659971-f01207815844?auto=format&fit=crop&q=80&w=800" alt="Lobster Thermidor" />
            </div>
            <h3>Lobster Thermidor</h3>
          </div>
          <div className="dish-card">
            <div className="dish-img-wrapper">
              <img src="https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=800" alt="Rack of Lamb" />
            </div>
            <h3>Rack of Lamb</h3>
          </div>
          <div className="dish-card">
            <div className="dish-img-wrapper">
              <img src="/dish-2.jpg" alt="Duck a l'Orange" />
            </div>
            <h3>Duck a l'Orange</h3>
          </div>
          <div className="dish-card">
            <div className="dish-img-wrapper">
              <img src="/dish-3.jpg" alt="Beef Wellington" />
            </div>
            <h3>Beef Wellington</h3>
          </div>
          <div className="dish-card">
            <div className="dish-img-wrapper">
              <img src="/dish-1.jpg" alt="Coquilles Saint Jacques" />
            </div>
            <h3>Coquilles Saint Jacques</h3>
          </div>
          <div className="dish-card">
            <div className="dish-img-wrapper">
              <img src="/dish-5.jpg" alt="Chilean Sea Bass" />
            </div>
            <h3>Chilean Sea Bass</h3>
          </div>
          <div className="dish-card">
            <div className="dish-img-wrapper">
              <img src="/dish-4.jpg" alt="Tagliatelle al Tartufo" />
            </div>
            <h3>Tagliatelle al Tartufo</h3>
          </div>
          <div className="dish-card">
            <div className="dish-img-wrapper">
              <img src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=800" alt="Prime Rib" />
            </div>
            <h3>Prime Rib</h3>
          </div>
        </div>
      </section>

      <section className="location-section" id="location">
        <h2>Find One of Our Restaurants Near You</h2>
        
        <div className="location-content" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
          <div className="search-form" style={{ flex: 1 }}>
            <div className="input-group">
              <input type="text" placeholder="Search for Location" />
            </div>
            <div className="input-group">
              <input type="text" placeholder="City or Postal Code" />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Country" />
            </div>
            <button className="btn-book" disabled style={{ marginTop: '1rem', width: '100%', marginBottom: '2rem', cursor: 'not-allowed', opacity: 0.6 }}>Shortly</button>

            <div className="footer-links">
              <a href="#">Terms &amp; Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          
          <div className="location-image" style={{ flex: 1.2 }}>
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" 
              alt="Restaurant interior" 
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px' }} 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GourmetBistro;
