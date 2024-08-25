"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Screen from "@/Img/NVIDIAScreen.png";
import Screen2 from "@/Img/MetaScreen.png";
import Screen3 from "@/Img/NasaScreen.png";

interface ImageData {
  src: string | StaticImageData;
  alt: string;
}

const images: ImageData[] = [
  { src: Screen2, alt: "Segunda imagen" },
  { src: Screen, alt: "Tercera imagen" },
  { src: Screen3, alt: "Cuarta imagen" },
];

function HomePage() {
  const [ImageScreen, setImageScreen] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageScreen((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full h-screen flex overflow-hidden main-content ">
      <div className="bg-blue-400 blur-[10rem] w-56 h-56 rounded-full flex absolute -right-10 -top-20"></div>
      <div className="bg-teal-400 blur-[10rem] w-56 h-56 rounded-full flex absolute -left-10 -bottom-20"></div>
      <section className="gap-8 w-full h-screen flex justify-around items-center px-8">
        <div className="w-[50%] flex flex-col gap-4">
          <h1 className="text-white text-5xl font-semibold">
            Enhance and edit your{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-teal-400  bg-clip-text">
              screenshots
            </span>{" "}
            instantly
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-teal-400  bg-clip-text">
              .
            </span>
          </h1>
          <p className="text-white text-sm">
            ScreenRen it allows you to transform simple screenshots into
            stunning images in a matter of seconds. With an intuitive interface
            and a set of advanced tools, you can effortlessly add annotations,
            apply filters, crop, and adjust the sharpness, color, and brightness
            of your screenshots.
          </p>
          <div className="flex gap-8">
            <button className="border-transparent text-white bg-gradient-to-br from-teal-400 to-blue-600 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-10 py-2 text-center focus:ring-2 focus:outline-none focus:ring-teal-950 ">
              Start now
            </button>
            <button className="text-white bg-zinc-900 px-9 py-1 rounded-md border-2 border-zinc-900 hover:border-white focus:ring-1 focus:outline-none focus:ring-white ">
              How it works
            </button>
          </div>
        </div>
        <div className="text-white">
          <div>
            <div className="bg-neutral-400 w-[30rem] h-7 rounded-t-lg flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded-full ml-2 "></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full "></div>
              <div className="w-4 h-4 bg-green-400 rounded-full "></div>
            </div>
            <div className="relative w-[30rem] h-72 flex justify-center items-center rounded-b-lg bg-gradient-to-br from-teal-400 to-blue-600">
              <div className="carousel-container">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={500}
                    className={`carousel-image rounded-lg ${
                      index === ImageScreen ? "active" : ""
                    }`}
                  />
                ))}
              </div>
              <p className="rounded-lg absolute bottom-2 right-2 font-semibold text-xs">
                ScreenRen.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
