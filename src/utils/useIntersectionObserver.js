import { useEffect, useState } from 'react';

const useIntersectionObserver = (containerRef) => {
  //trigger animation once container in view
  const [isInView, setIsInView] = useState(false);

  //observe intersections with viewport
   useEffect(() => {
    console.log('attempting to observe');
     //create a new IntersectionObserver object
     const observer = new IntersectionObserver((entries) => {

       // entry object provides information about a single intersection between 
       // a target element and its root container
       entries.forEach((entry) => {

         // if observed element is currently intersecting with the root container
         if (entry.isIntersecting) {
          console.log('Element is intersecting');
           //change isInView state, trigger map animations
           setIsInView(true);
           // from the list of elements being observed by the observer
           observer.unobserve(entry.target);
         }
       });
     });
 
     //if images parent exists start observing
     if (containerRef.current) {
      console.log('Observing:', containerRef.current);
      observer.observe(containerRef.current);
    } else {
      console.log('containerRef.current is null');
    }
 
     return () => { // clean up
       if (containerRef.current) {
        console.log('Unobserving:', containerRef.current);
         //stop observing once unmounted
         observer.unobserve(containerRef.current);
       }
     };
   }, []);

   //main function -------------------------------------------
   return isInView;
};

export default useIntersectionObserver;
