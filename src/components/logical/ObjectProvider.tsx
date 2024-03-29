import { ObjectBulk, ObjectContextInterface, ObjectDefault } from "Contexts";
import {
  InterObject,
  ObjectType,
  Position,
} from "interObjects/define/interObject";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useGeo from "hooks/useGeo";
import { cloneDeep, uniq } from "lodash";
import useDB from "hooks/useDB";
import useLinearDB from "hooks/useLinearDB";
import { BoardCtx } from "./BoardProvider";
import useAssociateDB from "hooks/useAssociateDB";

export const ObjCtx = createContext<ObjectContextInterface>(ObjectDefault);

const obj1 = new InterObject(ObjectType.Sketch, "SketchText", "default").move({
  x: -100,
  y: -100,
});

interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface PosRecord {
  [id: string]: Position;
}

export default function ObjectProvider({ children }: Props) {
  const [objBulk, setObjBulk] = useState<ObjectBulk>({
    obj1,
  });
  const [objList, setObjList] = useState<string[]>(["default"]);

  const { current, boards, syncObjectList } = useContext(BoardCtx);

  const board = boards[current];

  const { data, sync } = useAssociateDB<InterObject>(
    current,
    "objects",
    { key: "id", indexs: [], defaultData: [obj1] },
    (data) => new InterObject().load(data)
  );

  const { lastX, lastY, x, y, select: selecting, realToPos } = useGeo();
  const [selected, setSelected] = useState<string[]>([]);
  const shift = useRef<boolean>(false);
  const dragging = useRef<boolean | null>(false);

  const dragRecord = useRef<PosRecord>({});

  const onDrop = useRef<[string, () => void][]>([]);

  function select(targets: string[], keep: boolean = false) {
    if (keep || shift.current) setSelected(uniq([...targets, ...selected]));
    else setSelected(targets);
  }

  function unselect(targets: string[]) {
    setSelected(selected.filter((s) => !targets.includes(s)));
  }

  function intersect(A: Rect, B: Rect) {
    const nonIntersect =
      B.right < A.left ||
      B.left > A.right ||
      B.bottom < A.top ||
      B.top > A.bottom;
    return !nonIntersect;
  }

  useEffect(() => {
    if (data) setObjBulk(data);
  }, [data]);

  useEffect(() => {
    setObjList(board.objList);
  }, [board]);

  useEffect(() => {
    function mousedown(e: MouseEvent) {
      if (e.button === 0) {
        select([]);
        const tmp = document.createElement("input");
        document.body.appendChild(tmp);
        tmp.focus();
        document.body.removeChild(tmp);
      }
    }
    function mouseup() {
      dragging.current = false;
      if (!selecting) return;
      const selection: string[] = [];
      Object.keys(objBulk).forEach((id) => {
        const realId = `inter-obj-${id}`;
        const element = document.getElementById(realId);
        if (element) {
          const A = {
            left: lastX < x ? lastX : x,
            top: lastY < y ? lastY : y,
            right: lastX > x ? lastX : x,
            bottom: lastY > y ? lastY : y,
          };
          const B = element.getBoundingClientRect();

          if (intersect(A, B) && !objBulk[id].locked) selection.push(id);
        }
      });
      select(selection);
    }
    function keydown(e: KeyboardEvent) {
      shift.current = e.shiftKey;
    }
    function keyup(e: KeyboardEvent) {
      shift.current = e.shiftKey;
    }
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("mouseup", mouseup);
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mouseup", mouseup);
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("keyup", keyup);
    };
  }, [lastX, x, lastY, y, selecting]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      sync(objBulk);
    }, 500);

    return () => clearTimeout(timeout);
  }, [objBulk]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      syncObjectList(objList);
    }, 500);

    return () => clearTimeout(timeout);
  }, [objList]);

  useEffect(() => {
    function mousemove(e: MouseEvent) {
      if (dragging.current) {
        const newBulk = cloneDeep(objBulk);
        selected.forEach((id) => {
          const record = dragRecord.current[id];
          if (record) {
            newBulk[id]?.move(
              realToPos({
                x: record.x + e.clientX,
                y: record.y + e.clientY,
              })
            );
          }
        });
        setObjBulk(newBulk);
      }
    }
    document.addEventListener("mousemove", mousemove);
    return () => {
      document.removeEventListener("mousemove", mousemove);
    };
  }, [selected]);

  function startDrag(starter: string) {
    dragging.current = true;
    dragRecord.current = {};
    [starter, ...selected].forEach((id) => {
      const element = document.getElementById(`inter-obj-${id}`);
      if (element)
        dragRecord.current[id] = {
          x: (element.offsetLeft || 0) - x,
          y: (element.offsetTop || 0) - y,
        };
    });
  }

  function stopDrag() {
    dragging.current = true;
    dragRecord.current = {};
    if (onDrop.current) {
      const item = onDrop.current.pop();
      if (item) item[1]();
    }
  }

  return (
    <ObjCtx.Provider
      value={{
        objects: objBulk,
        setObjects: setObjBulk,
        objectList: objList,
        setObjectList: setObjList,
        select,
        unselect,
        selectedList: selected,
        dragging,
        startDrag,
        stopDrag,
        onDrop,
      }}
    >
      {children}
    </ObjCtx.Provider>
  );
}

interface Props {
  children: React.ReactNode;
}
