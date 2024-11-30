import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import type { Identifier, XYCoord } from "dnd-core";

type UseDragDropProps = {
  itemType: string;
  index: number;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

export const useDragDrop = <T extends HTMLElement>({
  itemType,
  index,
  onMove,
}: UseDragDropProps) => {
  const ref = useRef<T>(null);

  const [{ handlerId }, ...dropHooks] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: itemType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove?.(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const dragHooks = useDrag({
    type: itemType,
    item: () => {
      return { id: index + 1, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ isDragging }, drag] = dragHooks;

  const opacity = isDragging ? 0 : 1;
  const cursor = isDragging ? "grabbing" : "grab";
  drag(dropHooks[0](ref));

  return {
    drag: dragHooks,
    opacity,
    handlerId,
    drop: dropHooks,
    ref,
    preview: dragHooks[2],
    cursor,
  };
};
