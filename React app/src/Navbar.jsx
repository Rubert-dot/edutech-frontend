import React from 'react';

function Navbar({ setActivePage }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      background: '#2c3e50',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
  
      <div 
        onClick={() => setActivePage('home')} 
        style={{ fontSize: '24px', fontWeight: 'bold', cursor: 'pointer', color: '#3498db' }}
      >
        🎓 EduTechApp
      </div>

      
      <div style={{ display: 'flex', gap: '25px' }}>
        <span 
          onClick={() => setActivePage('home')} 
          style={{ cursor: 'pointer', fontSize: '16px', fontWeight: '500', transition: '0.3s' }}
          onMouseOver={(e) => e.target.style.color = '#3498db'}
          onMouseOut={(e) => e.target.style.color = 'white'}
        >
          Home
        </span>
        <span 
          onClick={() => setActivePage('courses')} 
          style={{ cursor: 'pointer', fontSize: '16px', fontWeight: '500', transition: '0.3s' }}
          onMouseOver={(e) => e.target.style.color = '#3498db'}
          onMouseOut={(e) => e.target.style.color = 'white'}
        >
          Courses
        </span>
        <span 
          onClick={() => setActivePage('about')} 
          style={{ cursor: 'pointer', fontSize: '16px', fontWeight: '500', transition: '0.3s' }}
          onMouseOver={(e) => e.target.style.color = '#3498db'}
          onMouseOut={(e) => e.target.style.color = 'white'}
        >
          About
        </span>
        <span 
          onClick={() => setActivePage('contact')} 
          style={{ cursor: 'pointer', fontSize: '16px', fontWeight: '500', transition: '0.3s' }}
          onMouseOver={(e) => e.target.style.color = '#3498db'}
          onMouseOut={(e) => e.target.style.color = 'white'}
        >
          Contact
        </span>
      </div>
    </nav>
  );
}

export default Navbar;