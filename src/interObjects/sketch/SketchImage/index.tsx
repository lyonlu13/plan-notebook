import styled from "styled-components";
import LocBase from "interObjects/struct/LocBase";
import useData from "hooks/useData";
import { SketchImageData } from "../../define/data";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { InterObjectComponentProps } from "interObjects/define/interObject";
import useGeo from "hooks/useGeo";
import Frame from "interObjects/struct/Frame";
import { MediaCtx } from "components/logical/MediaProvider";

const Img = styled.img`
  display: block;
`;

const Scaler = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: white;
  right: 0;
  bottom: 0;
  transition: 0.2s;
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  &:hover {
    background-color: #009faa;
  }
`;

const SketchImage: FC<InterObjectComponentProps> = ({
  id,
  x,
  y,
  selected,
}: InterObjectComponentProps) => {
  const { data: rawData, multiModify } = useData(id);
  const { x: geoX, y: geoY, zoom } = useGeo();
  const data = rawData as SketchImageData;
  const [resizing, setResizing] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastDim = useRef({ w: 0, h: 0 });
  const [realUrl, setRealUrl] = useState("");
  const { img } = useContext(MediaCtx);

  useEffect(() => {
    function mousemove(e: MouseEvent) {
      if (resizing) {
        e.preventDefault();
        let deltaX = e.clientX - lastPos.current.x;
        let deltaY = e.clientY - lastPos.current.y;
        deltaX /= zoom;
        deltaY /= zoom;
        const updateDim = {
          "dim.width":
            lastDim.current.w +
            (data.dim.resizeMode.h || data.dim.resizeMode.both ? deltaX : 0),
          "dim.height":
            lastDim.current.h +
            (data.dim.resizeMode.v || data.dim.resizeMode.both ? deltaY : 0),
        };
        if (e.shiftKey) {
          if (deltaX > deltaY) {
            updateDim["dim.height"] =
              lastDim.current.h *
              ((lastDim.current.w + deltaX) / lastDim.current.w);
          } else {
            updateDim["dim.width"] =
              lastDim.current.w *
              ((lastDim.current.h + deltaY) / lastDim.current.h);
          }
        }

        multiModify(updateDim);
      }
    }
    function mouseup() {
      setResizing(false);
    }
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    return () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
  }, [resizing]);

  useEffect(() => {
    if (data) {
      switch (data.source.type) {
        case "url":
          setRealUrl(data.source.sourceStr);
          break;
        case "store":
          img(data.source.sourceStr)
            .then((url) => {
              setRealUrl(url);
            })
            .catch((e) => {
              console.error(e);
            });
          break;
        default:
      }
    }
  }, [data]);

  function startResize() {
    lastPos.current = {
      x: geoX,
      y: geoY,
    };
    lastDim.current = {
      w: data.dim.width,
      h: data.dim.height,
    };
    setResizing(true);
  }

  if (!data) return null;

  let cursor = "";
  if (data.dim.resizeMode.both) cursor = "nwse-resize";
  else if (data.dim.resizeMode.h) cursor = "ew-resize";
  else if (data.dim.resizeMode.v) cursor = "ns-resize";

  return (
    <LocBase id={id} x={x} y={y}>
      <Frame id={id}>
        <Img
          style={{
            width: data.dim.width,
            height: data.dim.height,
            transform: `scaleX(${data.flip.v ? -1 : 1}) scaleY(${
              data.flip.h ? -1 : 1
            })`,
            borderRadius: data.radius,
          }}
          src={realUrl}
          alt=""
        />
        <Scaler
          style={{
            cursor: cursor,
            opacity: selected && !data.dim.resizeMode.none ? 1 : 0,
            pointerEvents:
              selected && !data.dim.resizeMode.none ? "auto" : "none",
          }}
          onMouseDown={(e) => {
            startResize();
            e.stopPropagation();
          }}
        />
      </Frame>
    </LocBase>
  );
};

export default SketchImage;
