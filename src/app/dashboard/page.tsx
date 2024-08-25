"use client";
import * as fabric from "fabric";
import React, { useEffect, useRef, useState } from "react";

const FabricCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);
  const [elements, setElements] = useState<fabric.Object[]>([]);
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textWidth, setTextWidth] = useState(200);

  useEffect(() => {
    if (canvasInstanceRef.current) {
      canvasInstanceRef.current.dispose();
    }

    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      canvasInstanceRef.current = canvas;

      // Manejar la adición de elementos
      canvas.on("object:added", (e) => {
        const target = e.target;
        if (target) {
          setElements((prevElements) => [...prevElements, target]);
        }
      });
    }

    return () => {
      if (canvasInstanceRef.current) {
        canvasInstanceRef.current.dispose();
      }
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && canvasInstanceRef.current) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imgElement = new Image();
        imgElement.src = event.target?.result as string;
        imgElement.onload = function () {
          const imgInstance = new fabric.Image(imgElement, {
            scaleX: 0.5,
            scaleY: 0.5,
            left: 100,
            top: 100,
          });
          canvasInstanceRef.current?.add(imgInstance);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIcons = (iconUrl: string) => {
    const imgElement = new Image();
    imgElement.src = iconUrl;
    imgElement.onload = function () {
      const imgInstance = new fabric.FabricImage(imgElement, {
        scaleX: 0.5,
        scaleY: 0.5,
        left: 100,
        top: 100,
      });
      canvasInstanceRef.current?.add(imgInstance);
    };
  };

  const handleAddText = () => {
    if (canvasInstanceRef.current && text) {
      const textInstance = new fabric.Textbox(text, {
        left: 100,
        top: 100,
        width: textWidth,
        fontFamily: fontFamily,
        fontSize: 30,
        fill: "#000",
        splitByGrapheme: true,
      });
      canvasInstanceRef.current.add(textInstance);
    }
  };

  const handleDeleteElement = (element: fabric.Object) => {
    canvasInstanceRef.current?.remove(element);
    setElements((prevElements) => prevElements.filter((el) => el !== element));
  };

  return (
    <div className="flex justify-center items-center w-full h-screen gap-8">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: "1px solid #000", marginTop: "10px" }}
      />
      <div className="w-60">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
          </select>
          <input
            type="number"
            placeholder="Width"
            value={textWidth}
            onChange={(e) => setTextWidth(parseInt(e.target.value, 10))}
            style={{ marginLeft: "10px" }}
          />
          <button onClick={handleAddText} style={{ marginLeft: "10px" }}>
            Add Text
          </button>
        </div>

        <div>
          <button onClick={() => handleIcons("../../Img/flecha.png")}>
            Flecha
          </button>
          <button
            onClick={() => handleIcons("../../Img/bandeja-de-salida.png")}
          >
            Flecha
          </button>
        </div>
      </div>
      <div className="w-36">
        <h3>Elementos en el Canvas:</h3>
        <ul>
          {elements.map((element, index) => (
            <li key={index}>
              Elemento {index + 1}
              <button
                onClick={() => handleDeleteElement(element)}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  borderRadius: "5px",
                  padding: "2px 5px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FabricCanvas;
