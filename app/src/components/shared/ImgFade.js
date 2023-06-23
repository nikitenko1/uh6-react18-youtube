import { useEffect, useRef, useState } from "react";

const ImgFade = ({ className, onLoad, crossOrigin: _, lazy_src, ...others }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const img = imgRef.current;
    // The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a
    //  target element with an ancestor element or with a top-level document's viewport.
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute("src", lazy_src);
      }
    });

    if (img) {
      observer.observe(img);
    }

    return () => {
      if (img) {
        observer.unobserve(img);
      }
    };
  }, [lazy_src]);

  return (
    <img
      ref={imgRef}
      alt="img"
      className={`${loaded ? "opacity-100" : "opacity-0"} transition duration-500 ${className}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad && onLoad(e);
      }}
      {...others}
    />
  );
};

export default ImgFade;
