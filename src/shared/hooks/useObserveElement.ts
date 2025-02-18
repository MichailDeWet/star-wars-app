import { useLayoutEffect, useRef, useState } from "react";

/**
 * This hook is used to determine whether a DOM element is in view or not
 * @returns
 */
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

    let element: HTMLDivElement | null;

    /* Checking for element every 100ms to avoid race conditions */
    const checkElement = setInterval(() => {
      element = elementRef.current;
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
