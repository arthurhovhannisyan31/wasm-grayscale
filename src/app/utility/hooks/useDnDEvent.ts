import {
  type UIEvent,
  type DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { stopImmediatePropagation } from "utility/utils";

const events: Partial<(keyof GlobalEventHandlersEventMap)[]> = ["drop", "dragover", "dragenter"];

export const useDnDEvent = (cb?: (e: DragEvent<HTMLInputElement>) => void) => {
  const [isOver, setIsOver] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const updateOverState = useCallback((e: DragEvent<HTMLInputElement>) => {
    switch (e.type) {
      case "dragenter":
      case "dragover": {
        const isChildrenEvent = ref.current.contains(e.target as Node);
        setIsOver(isChildrenEvent);

        return;
      }
      case "drop": {
        setIsOver(false);
      }
    }
  }, []);

  const eventHandler = useCallback((e: unknown) => {
    stopImmediatePropagation(e as UIEvent);
    updateOverState(e as DragEvent<HTMLInputElement>);

    cb?.(e as DragEvent<HTMLInputElement>);
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
