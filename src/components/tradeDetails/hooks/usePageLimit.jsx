import {useState, useEffect} from 'react';
// Hook
export default function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [pageLimit, setPageLimit] = useState(10);
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        if(window.innerWidth < 768 && pageLimit == 10){
            setPageLimit(10);
        }
        else{
            setPageLimit(
                6
            );
        }
       
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return pageLimit;
  }