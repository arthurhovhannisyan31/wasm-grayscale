import { type DragEvent, useCallback, useEffect, useRef, useState } from "react";

import { stopImmediatePropagation } from "app/utility/helpers/utils";

const events = ["drop", "dragover", "dragenter"] as (keyof DocumentEventMap)[];

export const useDnDEvent = (cb?: (e: DragEvent<HTMLInputElement>) => void) => {
  const [isOver, setIsOver] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const updateOverState = useCallback((e: DragEvent<HTMLInputElement>) => {
    switch (e.type) {
      case "dragenter":
      case "dragover": {
        const isChildrenEvent = !!ref.current?.contains(e.target as Node);
        setIsOver(isChildrenEvent);

        return;
      }
      case "drop": {
        setIsOver(false);
      }
    }
  }, []);

  const eventHandler = useCallback(<T extends UIEvent>(e: T) => {
    stopImmediatePropagation(e);
    updateOverState(e as never as DragEvent<HTMLInputElement>);

    cb?.(e as never as DragEvent<HTMLInputElement>);
  }, [cb, updateOverState]);

  useEffect(() => {
    events.forEach((event) => document.addEventListener(event, eventHandler));

    return () => {
      events.forEach((event) => document.removeEventListener(event, eventHandler));
    };
  }, [eventHandler]);

  return {
    isOver,
    ref,
  };
};
