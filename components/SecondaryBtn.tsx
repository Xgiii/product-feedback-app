import React from 'react';

function SecondaryBtn({
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
        'rounded-md w-full sm:w-auto text-sm bg-indigo-950 hover:bg-indigo-950/95 py-2 px-4 font-bold text-white ' +
        className
      }
    >
      {children}
    </button>
  );
}

export default SecondaryBtn;
