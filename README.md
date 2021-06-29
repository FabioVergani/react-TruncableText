# react-TruncableText
TruncableText overflow detection with minimal re-renders

example:
```
import React, { useState } from "react";
import TruncableText from "./TruncatableText";

function App() {
  const [flag, setFlag] = useState(true);
  return (
    <div className="App">
      {flag && (
        <TruncableText
          string="aaaaaaaaaaaaaaaaaaaa"
          // titleOnTruncate="demo"
          className="custom-add"
        />
      )}
      <button
        onClick={() => {
          setFlag(!flag);
        }}
      >
        Toggle me
      </button>
    </div>
  );
}
```
