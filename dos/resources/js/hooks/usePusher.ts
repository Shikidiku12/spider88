import { useCallback, useEffect } from "react";

import { PusherEventsEnum } from "../enums/Pusher";

const usePusherEventListener = (
  callback: Function,
  eventKeys: PusherEventsEnum[]
) => {
  const pusher: any = null;

  const handleUpdate = useCallback(() => {
    typeof callback === "function" ? callback() : null;
  }, [callback]);

  useEffect(() => {
    if (!pusher) return;
    eventKeys.map((eventKey) => pusher?.bind(eventKey, () => handleUpdate()));

    return () => {
      eventKeys.map((eventKey) => pusher?.unbind(eventKey));
    };
  }, [eventKeys, pusher, handleUpdate]);

  return;
};

export default usePusherEventListener;
