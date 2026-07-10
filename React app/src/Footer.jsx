import React from 'react';

function Footer({ setActivePage }) {
  return (
    <footer style={{ background: '#2c3e50', color: 'white', padding: '20px', textAlign: 'center', marginTop: 'auto' }}>
      <p style={{ margin: '0 0 10px 0' }}>© 2026 EduTechApp. All Rights Reserved.</p>
      <div>
        <span onClick={() => setActivePage('about')} style={{ margin: '0 10px', cursor: 'pointer', color: '#3498db' }}>About</span> | 
        <span onClick={() => setActivePage('contact')} style={{ margin: '0 10px', cursor: 'pointer', color: '#3498db' }}>Contact Us</span>
      </div>
    </footer>
  );
}

export default Footer;
