"use client";
import React, { useState, useRef, useEffect } from "react";

const Page = () => {
  const [size, setSize] = useState<number>(50);
  const [rotate, setRotate] = useState<number>(0);
  const [borderRadius, setBorderRadius] = useState<number>(0);
  const [gradient, setGradient] = useState<string>(
    "linear-gradient(220.55deg, #8FFF85 0%, #39A0FF 100%)"
  );
  const [image, setImage] = useState<string | undefined>();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image && imageRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();
      setPosition({
        x: (containerRect.width - imageRect.width) / 2,
        y: (containerRect.height - imageRect.height) / 2,
      });
    }
  }, [image, size]);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging && imageRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newX =
        e.clientX - containerRect.left - imageRef.current.clientWidth / 2;
      const newY =
        e.clientY - containerRect.top - imageRef.current.clientHeight / 2;

      setPosition({ x: newX, y: newY });
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex justify-between items-center w-full h-screen gap-12">
      {image === undefined ? (
        <div className="flex items-center justify-center w-[50%]">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <div
          style={{ background: `${gradient}` }}
          ref={containerRef}
          className="w-[40rem] h-96 relative overflow-hidden flex justify-center items-center bg-slate-50"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <img
            ref={imageRef}
            src={image}
            alt="Selected"
            style={{
              width: `${size}%`,
              transform: `rotate(${rotate}deg)`,
              borderRadius: borderRadius === 50 ? "50%" : `${borderRadius}px`,
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              cursor: dragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
            onDragStart={handleDragStart} // Deshabilitar el arrastre por defecto
          />
        </div>
      )}

      <div className="w-[20rem] p-4 border-teal-600 border-2 rounded-lg">
        <div className="flex flex-col">
          <label htmlFor="sizeRanger">Size:</label>
          <div className="flex items-center gap-4">
            <input
              className="accent-cyan-400 cursor-pointer w-40 rounded-xl h-[0.3rem]"
              type="range"
              name="sizeRanger"
              id="sizeRanger"
              min="0"
              max="100"
              value={size}
              onChange={(e) => {
                setSize(Number(e.target.value));
              }}
            />
            <p>{`${size}%`}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="sizeRanger">Rotate:</label>

          <div className="flex items-center gap-4">
            <input
              className="accent-cyan-400 cursor-pointer w-40 rounded-xl h-[0.3rem]"
              type="range"
              name="rotateRanger"
              id="rotateRanger"
              min="-100"
              max="100"
              value={rotate}
              onChange={(e) => {
                setRotate(Number(e.target.value));
              }}
            />
            <p>{`${rotate}%`}</p>
          </div>
        </div>
        <div>
          <div>Border Radius:</div>

          <div className="flex  gap-4">
            <button
              onClick={() => setBorderRadius(5)}
              className="cursor-pointer border-teal-600 border-2 rounded-lg w-12 focus:ring-2 focus:outline-none focus:ring-teal-100 "
            >
              5px
            </button>
            <button
              onClick={() => setBorderRadius(10)}
              className="cursor-pointer border-teal-600 border-2 rounded-lg w-12 focus:ring-2 focus:outline-none focus:ring-teal-100 "
            >
              10px
            </button>
            <button
              onClick={() => setBorderRadius(15)}
              className="cursor-pointer border-teal-600 border-2 rounded-lg w-12 focus:ring-2 focus:outline-none focus:ring-teal-100 "
            >
              15px
            </button>
            <button
              onClick={() => setBorderRadius(50)}
              className="cursor-pointer border-teal-600 border-2 rounded-lg w-12 focus:ring-2 focus:outline-none focus:ring-teal-100 "
            >
              Full
            </button>
          </div>
        </div>

        <div>
          <div>Gradient:</div>
          <div className="flex flex-wrap gap-2">
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #8FFF85 0%, #39A0FF 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white "
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #8FFF85 0%, #39A0FF 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #A531DC 0%, #4300B1 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #A531DC 0%, #4300B1 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #C5EDF5 0%, #4A879A 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #C5EDF5 0%, #4A879A 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #FF3F3F 0%, #063CFF 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #FF3F3F 0%, #063CFF 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #24CFC5 0%, #001C63 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #24CFC5 0%, #001C63 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #FFF500 0%, #FF00B8 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #FFF500 0%, #FF00B8 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #565656 0%, #181818 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #565656 0%, #181818 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #FF9D7E 0%, #4D6AD0 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #FF9D7E 0%, #4D6AD0 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #61C695 0%, #133114 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #61C695 0%, #133114 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #FFDC99 0%, #FF62C0 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #FFDC99 0%, #FF62C0 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #FFC328 0%, #E20000 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #FFC328 0%, #E20000 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #8A88FB 0%, #D079EE 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #8A88FB 0%, #D079EE 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #FFADF7 0%, #B1FF96 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #FFADF7 0%, #B1FF96 100%)"
                )
              }
            ></button>
            <button
              style={{
                background:
                  "linear-gradient(220.55deg, #8FFF85 0%, #39A0FF 100%)",
              }}
              className="w-8 h-8 rounded-full focus:ring-2 focus:outline-none focus:ring-white"
              onClick={() =>
                setGradient(
                  "linear-gradient(220.55deg, #8FFF85 0%, #39A0FF 100%)"
                )
              }
            ></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
