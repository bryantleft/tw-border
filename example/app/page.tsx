export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-8">
        <div className="grid grid-cols-1 gap-8 items-center justify-items-center">
          <div>
            <h3 className="text-sm font-semibold mb-4 text-center">Small</h3>
            <div className="border-2 border-dashed border-animate bg-gray-300 w-[150px] h-[100px] rounded-md">
              <svg className="border-svg"><rect /></svg>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 text-center">Medium</h3>
            <div className="border border-dashed border-animate bg-gray-300 w-[300px] h-[200px] rounded-md">
              <svg className="border-svg"><rect /></svg>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 text-center">Large</h3>
            <div className="border-3 border-dashed border-animate bg-gray-300 w-[450px] h-[300px] rounded-full">
              <svg className="border-svg"><rect /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
