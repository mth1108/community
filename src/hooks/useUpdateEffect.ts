import {useEffect, useRef} from "react";

export function useUpdateEffect(effect: any, deps: number[] | string[]) {

  const isMounted = useRef(false);

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);

}

