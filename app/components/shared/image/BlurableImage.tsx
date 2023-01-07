import { cloneElement, useEffect, useRef, useState } from "react";
import { useSSRLayoutEffect } from "~/shared/hooks/useSSRLayoutEffect";
import { classNames } from "~/shared/utils/classNames";

function BlurrableImage({
  img,
  blurDataUrl,
  ...rest
}: {
  img: JSX.Element &
    React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>;
  blurDataUrl?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [visible, setVisible] = useState(false);
  const jsImgElRef = useRef<HTMLImageElement>(null);

  useSSRLayoutEffect(() => {
    if (jsImgElRef.current?.complete) setVisible(true);
  }, []);

  useEffect(() => {
    if (!jsImgElRef.current) return;
    if (jsImgElRef.current.complete) return;

    let current = true;
    jsImgElRef.current.addEventListener("load", () => {
      if (!jsImgElRef.current || !current) return;
      setTimeout(() => {
        setVisible(true);
      }, 0);
    });

    return () => {
      current = false;
    };
  }, []);

  const jsImgEl = cloneElement(img, {
    ref: jsImgElRef,
    className: classNames(
      img.props.className,
      "transition-opacity",
      !visible ? "opacity-0" : ""
    ),
  });

  return (
    <div {...rest}>
      {blurDataUrl ? (
        <>
          <img
            key={blurDataUrl}
            src={blurDataUrl}
            className={img.props.className}
            alt={img.props.alt}
          />
          <div
            className={classNames(img.props.className, "backdrop-blur-xl")}
          />
        </>
      ) : null}
      {jsImgEl}
      <noscript>{img}</noscript>
    </div>
  );
}

export { BlurrableImage };
