import React from "react";
import "./../style.css";

function About() {
  return (
    <div className="about-container">

      {/* HERO SECTION */}
      <section className="about-hero fade-in">
        <div className="about-hero-text">
          <h1>About <span className="brand-color">Flozz</span></h1>
          <p>
            At Flozz, we create footwear that blends premium comfort, timeless style, 
            and modern craftsmanship — designed for everyday champions like you.
          </p>
        </div>

        <div className="about-hero-img floating">
          <img
            src="https://images.unsplash.com/photo-1519744792095-2f2205e87b6f"
            alt="Flozz Shoes"
          />
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="story-section fade-in">
        <h2>Our Story</h2>
        <p>
          Flozz began with a simple belief — **good shoes change your day, great shoes change your life**.
          What started as a small footwear idea has grown into a brand trusted by thousands.
          We combine innovation, comfort-focused design, and durable materials to deliver 
          footwear you’ll love wearing every single day.
        </p>
      </section>

      {/* MISSION - VISION */}
      <section className="mv-section fade-in">
        <div className="mv-card">
          <h3>✨ Our Mission</h3>
          <p>To craft high-quality, stylish footwear that gives confidence with every step.</p>
        </div>

        <div className="mv-card">
          <h3>🚀 Our Vision</h3>
          <p>To become the most loved footwear brand known for comfort, quality, and innovation.</p>
        </div>
      </section>

      {/* WHY FLOZZ */}
      <section className="why-section fade-in">
        <h2>Why Choose Flozz?</h2>

        <div className="why-grid">
          <div className="why-card">
            <span className="emoji">👟</span>
            <h4>Premium Quality</h4>
            <p>Every shoe is crafted with precision and high-grade materials.</p>
          </div>

          <div className="why-card">
            <span className="emoji">🪶</span>
            <h4>Ultra Comfort</h4>
            <p>Designed to stay comfortable even after long hours.</p>
          </div>

          <div className="why-card">
            <span className="emoji">🎨</span>
            <h4>Modern Designs</h4>
            <p>Trendy, lightweight, and perfect for every outfit.</p>
          </div>

          <div className="why-card">
            <span className="emoji">💪</span>
            <h4>Long-Lasting</h4>
            <p>Built to withstand daily wear and rough use.</p>
          </div>
        </div>
      </section>
       {/* ===================== CONTACT INFORMATION ===================== */}
      <section className="contact-info-section">
  	<h2 className="text-center mt-5 mb-4">📞 Contact Us</h2>

  	<div className="contact-info-box">
    	  <div className="contact-item">
      	  <span className="contact-icon">📧</span>
          <h4>Email</h4>
          <p>support@flozzfootwear.com</p>
        </div>

        <div className="contact-item">
          <span className="contact-icon">📱</span>
      	  <h4>Phone</h4>
          <p>+91 73965 40940</p>
        </div>

    	<div className="contact-item">
      	  <span className="contact-icon">📍</span>
      	  <h4>Head Office</h4>
          <p>Hyderabad, Telangana, India</p>
    	</div>
      </div>
     </section>


      {/* TEAM */}
     <section className="team-section fade-in">
       <h2>Meet Our Team</h2>

       <div className="team-grid">
         <div className="team-card floating">
           <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
           <h4>Fayaz Mohammed</h4>
           <p>Founder & CEO</p>
         </div>

         <div className="team-card floating">
           <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="" />
           <h4>Zara Khan</h4>
           <p>Lead Designer</p>
         </div>

         <div className="team-card floating">
           <img src="https://randomuser.me/api/portraits/men/76.jpg" alt="" />
           <h4>Arjun Patel</h4>
           <p>Production Head</p>
         </div>
       </div>
     </section>

    </div>
  );
}

export default About;

