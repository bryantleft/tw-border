export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 items-center justify-items-center">
          <div>
            <div className="border-2/30 border-dashed border-animate dash-24 bg-gray-300 w-[120px] h-[80px] sm:w-[150px] sm:h-[100px]">
              <svg className="border-svg"><rect /></svg>
            </div>
          </div>
          <div>
            <div className="border-[4px] border-dashed border-animate bg-gray-300 w-[220px] h-[150px] sm:w-[300px] sm:h-[200px] rounded-xl">
              <svg className="border-svg"><rect /></svg>
            </div>
          </div>
          <div>
            <div className="border-3 border-red-500/30 border-dashed hover:border-animate dash-[5px] bg-red-100 w-[260px] h-[180px] sm:w-[360px] sm:h-[240px] md:w-[450px] md:h-[300px] rounded-full">
              <svg className="border-svg"><rect /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
