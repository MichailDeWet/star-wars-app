import { useLayoutEffect, useRef, useState } from "react";

export const useObserveElement = () => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("LOG: in view");
            setIsInView(true);
          } else {
            console.log("LOG: NOT in view");
            setIsInView(false);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const checkElement = setInterval(() => {
      if (elementRef.current) {
        observer.observe(elementRef.current);
        clearInterval(checkElement);
      }
    }, 100);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }

      clearInterval(checkElement);
    };
  }, []);

  return { isInView, elementRef };
};
