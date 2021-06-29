import React, { useRef, useState, useLayoutEffect } from "react";
// import ResizeObserver from 'resize-observer-polyfill';

const TruncableText = ({
  useTitleOnTruncate = true,
  string = "",
  titleOnTruncate = string,
  style,
  ...rest
}) => {
  const [state, setState] = useState({
    observedNode: null,
    hasOverflow: false
  });
  const observer = useRef(
    new ResizeObserver(([entry]) => {
      const node = entry.target;
      const bool = node.offsetHeight < node.scrollHeight || node.offsetWidth < node.scrollWidth;
      if (bool !== state.hasOverflow) {
        state.hasOverflow = bool;
        setState({ ...state });
      }
    })
  );
  useLayoutEffect(() => {
    const myObserver = observer.current;
    const target = state.observedNode;
    if (target) {
      myObserver.observe(target);
    }
    return () => {
      myObserver.disconnect();
    };
  }, [state.observedNode]);
  return (
    <span
      {...rest}
      style={{
        ...style,
        textOverflow: "ellipsis",
        display: "inline-block",
        overflow: "hidden",
        maxWidth: "100%"
      }}
      ref={node => {
        state.observedNode = node;
      }}
      title={useTitleOnTruncate && state.hasOverflow ? titleOnTruncate : null}
    >
      {string}
    </span>
  );
};

export default TruncableText;
