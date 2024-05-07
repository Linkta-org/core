import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';

import useStore from '@/client/stores/nodeMindMapStore';
import { useLayoutEffect, useRef, useEffect } from 'react';
import React from 'react';

export type NodeData = {
  label: string;
};

export function MindMapNode({ id, data }: NodeProps<NodeData>) {
  const inputRef = useRef<HTMLInputElement>();
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${data.label.length * 8}px`;
    }
  }, [data.label.length]);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 1);
  }, []);

  return (
    <>
      <div className="inputWrapper">
        <div className="dragHandle">
          {/* icon taken from grommet https://icons.grommet.io */}
          <svg viewBox="0 0 24 24">
            <path
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          value={data.label}
          onChange={(e) => updateNodeLabel(id, e.target.value)}
          className="input"
        />
      </div>
      <Handle
        type="target"
        position={Position.Top}
      />
      <Handle
        type="source"
        position={Position.Bottom}
      />
    </>
  );
}
