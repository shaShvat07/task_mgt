import React, { useEffect, useRef } from 'react';
import './LandingPage.css';
const LandingPage = () => {
  const leftSideRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const leftSide = leftSideRef.current;
      if (leftSide) {
        leftSide.style.width = `${e.clientX / window.innerWidth * 100}%`;
      }
    };

    const handleTouchMove = (e) => {
      handleMove(e.touches[0]);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <>
      <div id="left-side" class="side" ref={leftSideRef}>
        <h2 class="title">
           Empower Your Productivity Journey with 
          <span class="fancy">TaskMgt</span>
        </h2>
      </div>
      <div id="right-side" class="side">
        <h2 class="title">
        Empower Your Productivity Journey with 
          <span class="fancy">TaskMgt</span>
        </h2>
      </div>
    </>
  );
};


export default LandingPage;