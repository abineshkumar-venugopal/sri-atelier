"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

export default function OrientationImage({
  alt,
  onLoad,
  style,
  ...props
}: ImageProps) {
  const [objectFit, setObjectFit] = useState<"cover" | "contain">("cover");

  return (
    <Image
      alt={alt}
      {...props}
      style={{ ...style, objectFit }}
      onLoad={(event) => {
        const image = event.currentTarget;
        setObjectFit(
          image.naturalHeight > image.naturalWidth ? "contain" : "cover"
        );
        onLoad?.(event);
      }}
    />
  );
}
