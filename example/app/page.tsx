export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-8">
        <div className="grid grid-cols-1 gap-8 items-center justify-items-center">
          <div>
            <div className="border-2/30 border-dashed border-animate bg-gray-300 w-[150px] h-[100px]">
              <svg className="border-svg"><rect /></svg>
            </div>
          </div>
          <div>
            <div className="border-[4px] border-dashed border-animate bg-gray-300 w-[300px] h-[200px] rounded-xl">
              <svg className="border-svg"><rect /></svg>
            </div>
          </div>
          <div>
            <div className="border-3 border-[#ff0000]/30 border-dashed hover:border-animate bg-red-100 w-[450px] h-[300px] rounded-full">
              <svg className="border-svg"><rect /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
