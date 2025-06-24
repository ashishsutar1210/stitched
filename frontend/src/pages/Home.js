import React, { useEffect, useState } from 'react';
// import OwnerInfo from '../components/OwnerInfo';
import NotificationBanner from '../components/NotificationBanner';
import tailorImg from '../tailor.png';
import { apiRequest } from '../utils/api';

const ownerEssay = `At the heart of every perfectly tailored outfit lies not just skill, but care, patience, and commitment. Based in the vibrant state of Maharashtra, our tailoring service is deeply rooted in the values of trust, quality, and tradition — just like every household that calls this region home.

For years, we have worked with dedication to bring your ideas and fabrics to life. Whether it's a simple blouse, a custom saree fall, a modern kurti, or perfectly fitted gents' trousers — every stitch is a promise to maintain excellence and personal touch.

We understand that for many, clothing is not just about fashion, but about identity, rituals, and memories. That's why we don't believe in a one-size-fits-all approach. Every measurement we take, every pattern we cut, and every fabric we work with is treated with precision and respect — like we're tailoring for our own family.

Our tailoring isn't just a service; it's a relationship. From urgent last-minute alterations to elaborate wedding outfits, we handle your requirements with warmth, clarity, and honesty.

Being part of the local community, we pride ourselves on blending traditional craftsmanship with modern designs. We also support handloom artisans and promote sustainable fabrics whenever possible — because tailoring should be both beautiful and responsible.

Timely delivery, fair pricing, and a smile that comes from satisfied customers — that's what we work for.

Whether you walk in with a dream design, or just an old garment that needs love, we are here to help you look your best — the Maharashtrian way: with simplicity, elegance, and authenticity.

Welcome to tailoring that cares.`;

function daysUntil(date) {
  const now = new Date();
  const target = new Date(date);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function Home() {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    apiRequest('/api/users')
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  useEffect(() => {
    const soon = users.filter(u => u.timeReady && [2, 3].includes(daysUntil(u.timeReady)));
    if (soon.length > 0) {
      const names = soon.map(u => u.name || 'Unnamed').join(', ');
      setNotification(`Orders for ${names} are due in 2 or 3 days!`);
    } else {
      setNotification('');
    }
  }, [users]);

  return (
    <div className="home-page">
       <div className="hero-section">
         <h1>Welcome to TailorApp</h1>
         <p className="hero-tagline">Where every stitch tells your story. Experience custom tailoring, modern designs, and personal service.</p>
       </div>
       <NotificationBanner message={notification} />
       {/* <OwnerInfo /> */}
       <div className="about-owner-section">
         <h2>About the Owner</h2>
         <img src={tailorImg} alt="Tailor" className="about-owner-img" />
         <p className="about-owner-essay">{ownerEssay}</p>
       </div>
     </div>
  );
}

export default Home; 