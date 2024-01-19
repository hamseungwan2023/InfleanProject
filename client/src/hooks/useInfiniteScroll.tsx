import { useCallback, useEffect, useState } from "react"

const useInfiniteScroll = (onIntersect: () => void, target: Element | null, options?: IntersectionObserverInit) => {

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        onIntersect();
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