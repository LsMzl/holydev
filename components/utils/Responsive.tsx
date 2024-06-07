import React from "react";

const Responsive = () => {
  return (
    <div className="sticky top-0 left-0 z-50">
      <div className="h-12 w-full bg-blue-400 text-5xl sm:hidden">XS</div>
      <div className="hidden h-12 w-full bg-green-400 text-5xl sm:block md:hidden">
        SM
      </div>
      <div className="hidden h-12 w-full bg-red-400 text-5xl md:block lg:hidden">
        MD
      </div>
      <div className="hidden h-12 w-full bg-purple-400 text-5xl lg:block xl:hidden">
        LG
      </div>
      <div className="hidden h-12 w-full bg-yellow-400 text-5xl xl:block 2xl:hidden">
        XL
      </div>
      <div className="hidden h-12 w-full bg-indigo-400 text-5xl 2xl:block">
        2XL
      </div>
    </div>
  );
};

export default Responsive;
