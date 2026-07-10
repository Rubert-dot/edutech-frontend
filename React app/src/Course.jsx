import React from 'react';

function Course(props) {
  const handleDetailsClick = () => {
    if (props.onViewDetails) {
      props.onViewDetails(props); 
    }
  };

  return (
    <div className="card">
      <img 
        src={props.image} 
        alt={props.name} 
        style={{ width: '100%', height: '110px', objectFit: 'contain', background: '#fff' }} 
      />
      <h3>{props.name}</h3>
      <p>{props.Details}</p>
      <button onClick={handleDetailsClick}
      style={{
        width:'100%',
        padding:'10px',
        backgroundColor:'#146397',
        color:'white',
        borderRadius:'20px',
        marginTop:'10px',
        transition:'background 0.3s',
        cursor:'pointer',
        fontWeight:'bold',
        border:'none'
      }}
      >
        View Details</button>
    </div>
  );
}

export default Course;