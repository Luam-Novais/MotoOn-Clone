export function SpinnerWithButton() {
  return <span className="w-3 h-3 border-2 border-t-amber-600 border-amber-300 rounded-full animate-spin "></span>;
}

export function Spinner() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-10 h-10 border-4 border-t-amber-600 border-amber-300  rounded-full animate-spin"></div>
    </div>
  );
}
export function LoadingDots() {
  return (
    <div className="flex justify-center mt-10 items-end gap-2 h-4 ">
      <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}