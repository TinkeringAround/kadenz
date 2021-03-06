import { useCallback, useState } from 'react';

export function useRefCallback() {
  const [node, setNode] = useState<any>(null);

  const setRef = useCallback(
    node => {
      if (node) {
        setNode(node);
      }
    },
    [setNode]
  );

  return { ref: node, setRef };
}
