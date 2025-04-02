"use client";
// import { useState } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  //   const [counter, setCounter] = useState(0);
  return (
    <div>
      {/* <h1>Hello World x{counter}</h1>
      <button onClick={() => setCounter(counter + 1)} className="cursor-pointer border-amber-50">
        +
      </button> */}
      {children}
    </div>
  );
};

export default Template;
