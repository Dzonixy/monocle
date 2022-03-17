import { useEffect } from "react";

// Hooks
import { useLinearProgressContext } from "contexts";

export function useProgress({ condition }) {
  const { setProgress } = useLinearProgressContext();

  useEffect(() => {
    if (condition) {
      setProgress(true);
    } else {
      setProgress(false);
    }
  }, [setProgress, condition]);
}
