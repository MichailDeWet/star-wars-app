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
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const element = elementRef.current;

    const checkElement = setInterval(() => {
      if (element) {
        observer.observe(element);
        clearInterval(checkElement);
      }
    }, 100);

    return () => {
      if (element) {
        observer.unobserve(element);
      }

      clearInterval(checkElement);
    };
  }, []);

  return { isInView, elementRef };
};
