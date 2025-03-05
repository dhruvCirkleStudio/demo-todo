export default function ErrorAlert() {
  return (
    <div className="border h-screen w-full absolute flex items-center justify-center top-0 left-0">
      <div className="flex items-center justify-center rounded-3xl">
        <div className="p-40 text-center shadow-2xl rounded-4xl">
          <h1 className=" font-bold">Something went wrong</h1>
          <h1 className=" font-bold">Try again!</h1>
        </div>
      </div>
    </div>
  );
}
