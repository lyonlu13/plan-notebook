import { DFCtx } from "components/logical/DataFlowProvider";
import useAppearance from "hooks/useAppearance";
import useData from "hooks/useData";
import useGeo from "hooks/useGeo";
import useObject from "hooks/useObject";
import useViewPort from "hooks/useViewPort";
import { ReactNode, useContext, useRef } from "react";
import { MdArrowLeft, MdArrowRight, MdInput } from "react-icons/md";
import styled from "styled-components";
import Frame from "../Frame";

const Root = styled.div`
  min-width: 200px;
  position: absolute;
  transform-origin: top left;
  z-index: 1;
`;

const Plate = styled.div`
  background-color: #414141;
  transform-origin: top left;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px #2c2c2c;
  padding: 5px 10px 10px 10px;
  color: white;
  cursor: move;
  transition: 0.2s;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  padding: 0 5px;
  margin-bottom: 5px;
  color: white;
  text-align: center;
`;

interface Props {
  id: string;
  x: number;
  y: number;
  children: ReactNode;
}

export default function Block({ id, x, y, children }: Props) {
  const { zoom, offsetX, offsetY } = useGeo();
  const { geoTransition } = useAppearance();
  const { select, startDrag, selectedList, stopDrag, selected, object } =
    useObject(id);
  const { data } = useData(id);
  const clickDetect = useRef(0);
  const { buildLine, lining } = useContext(DFCtx);

  return (
    <Root
      id={`inter-obj-${id}`}
      onMouseDown={(e) => {
        if (selected || !selectedList.length) {
          startDrag(id);
          select(true);
        } else if (selectedList.length) {
          startDrag(id);
          select();
        }
        e.stopPropagation();
        e.preventDefault();
        clickDetect.current = new Date().getTime();
      }}
      onMouseUp={(e) => {
        if (new Date().getTime() - clickDetect.current < 200) {
          select();
        }
        stopDrag();
      }}
      style={{
        left: offsetX + x * zoom,
        top: offsetY + y * zoom,
        transform: `scale(${zoom})`,
        transition: `${
          geoTransition ? "0.3s all," : ""
        }  0.2s box-shadow, opacity 0.3s`,
        opacity: object.visibility ? 1 : 0,
        pointerEvents: !object.visibility || object.locked ? "none" : "auto",
      }}
    >
      <Frame id={id} radius>
        <Plate>
          <Header>
            <MdArrowRight
              className={
                lining && !data.ports.in[0] ? "selectable" : "unselectable"
              }
              size={24}
              id="in0"
              onClick={() => {
                buildLine(id, 0);
              }}
            />
            <Title>
              {data.passive() && <MdInput />}
              {data.name}
            </Title>
            <MdArrowRight
              className={!lining ? "selectable" : "unselectable"}
              size={24}
              id="out0"
              onClick={() => {
                buildLine(id, 0);
              }}
            />
          </Header>
          {children}
        </Plate>
      </Frame>
    </Root>
  );
}
