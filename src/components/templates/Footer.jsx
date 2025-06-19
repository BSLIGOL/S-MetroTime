import React from "react";

function Footer() {
  return (
    <div className="flex flex-col w-full h-28">
      <div className="flex items-center justify-center h-3/5 w-full bg-gray-200">
        <h1 className="text-center text-sm text-black font-bold">
          © 2025 MetroTime. Real-time subway information system
        </h1>
      </div>
      <div className="h-2/5 w-full bg-white"></div>
    </div>
  );
}

export default Footer;
