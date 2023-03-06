import { useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";
import Vibrant from "node-vibrant";

export default function VibrantImage(props: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);

  const onLoad = async () => {
    const palettes = await Vibrant.from(props.src as string).getPalette();
    const mainColor = palettes.DarkVibrant?.getHex();
    if (ref.current) ref.current.style.backgroundColor = mainColor || "";
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Image
      ref={ref}
      {...props}
      className="w-full h-full object-contain object-center"
      alt={props.alt}
      data-action="zoom"
    />
  );
}
