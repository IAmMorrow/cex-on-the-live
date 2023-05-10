"use client";

type RowProps = {
  children: React.ReactNode;
  onClick: () => void;
  additionalProps?: any;
};

export function Row(props: RowProps) {
  const { children, onClick, additionalProps } = props;
  
  return (
    <div className="rounded-md mb-2 w-full">
      <button onClick={onClick} className="bg-neutral-800 p-4 rounded-md flex w-full items-center justify-between" {...additionalProps}>
        {children}
      </button>
    </div>
  );
}
