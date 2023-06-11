import React from 'react';

function MainBtn({
  children,
  className,
  onClick,
}: {
  children: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-md w-full sm:w-auto text-sm bg-purple-600 hover:bg-purple-700 py-2 px-4 font-bold text-white ' +
        className
      }
    >
      {children}
    </button>
  );
}

export default MainBtn;
