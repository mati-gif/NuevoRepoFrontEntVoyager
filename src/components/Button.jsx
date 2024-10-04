import React from 'react';

const Button = ({ onClick, text, backgroundColor, borderColor, arrowColor }) => {
  return (
    <div
      className={`group text-lg relative inline-flex items-center overflow-hidden rounded border-2 ${borderColor} px-3 py-3 ${backgroundColor} focus:outline-none focus:ring active:text-red-500 w-[50%]`}
      onClick={onClick}
    >
      <span className="absolute -end-full transition-all group-hover:end-4">
        <svg
          className={`size-4 rtl:rotate-180 ${arrowColor}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
      <span className="text-sm font-medium transition-all group-hover:me-4">{text}</span>
    </div>
  );
};

export default Button;
