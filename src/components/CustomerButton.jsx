import React from 'react';

const CustomerButton = ({ onClick, text, textColor, bgColor, hoverBgColor }) => {
  return (
    <div
      className={`inline-block rounded border border-transparent px-4 py-2 text-sm font-medium ${textColor} ${bgColor} hover:${hoverBgColor} focus:outline-none focus:ring active:bg-red-500 cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default CustomerButton;
