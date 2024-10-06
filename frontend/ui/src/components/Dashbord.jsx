import React from 'react'
import './Dashbord.css';
function Dashbord() {
    const text = "Welcome To Employee Admin Dash Bord";
  return (
    <div>
      <h2>
        {text.split("").map((char, index) => (
          <span key={index} style={{ '--delay': index }}>
            {char}
          </span>
        ))}
      </h2>
    <video width="100%" height="500px"  autoPlay  loop muted  controls={false}>
      <source src="bcv1.mp4" type="video/mp4"/>
     </video>
    </div>
    
  )
}

export default Dashbord