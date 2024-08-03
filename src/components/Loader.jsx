import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="loader-bar">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Loader;
