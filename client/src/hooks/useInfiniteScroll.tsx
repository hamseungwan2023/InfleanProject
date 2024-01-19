import { useCallback, useEffect, useState } from "react"

export type IntersectionHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

const useInfiniteScroll = (onIntersect: IntersectionHandler, target: Element | null, options?: IntersectionObserverInit) => {
  
  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    }, [onIntersect]
  )

  useEffect(
    () => {
      const observer = new IntersectionObserver(handleIntersect, options);
      console.log("@");
      target && observer.observe(target);
      return () => {
        observer.disconnect();
      }
    }, [handleIntersect, target, options]
  )
}

export default useInfiniteScroll;