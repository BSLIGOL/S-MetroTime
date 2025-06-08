function test() {
 return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between py-4 px-6 sm:px-8 bg-white shadow-md">
        <span className="text-lg font-semibold text-gray-800">메인화면</span>
        <div className="flex items-center space-x-2">
          {/* MetroTime Logo/Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5v11.25c0 .621.522 1.125 1.166 1.125h15.668c.644 0 1.166-.504 1.166-1.125V10.5m-18 0a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 10.5m-18 0V4.724a2.25 2.25 0 011.166-2.023l3.668-2.023a2.25 2.25 0 012.332 0l3.668 2.023a2.25 2.25 0 011.166 2.023V10.5m-18 0a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 10.5" />
          </svg>
          <span className="text-2xl font-bold text-gray-800">MetroTime</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center w-full px-4">
        {/* Search Input */}
        <div className="relative w-full max-w-md mb-12">
          <input
            type="text"
            placeholder="역을 입력하세요"
            className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700">
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 sm:space-x-12 w-full max-w-lg">
          {/* 즐겨찾기 Button */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer w-36 h-36 justify-center">
            {/* Star Icon (Orange) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-16 h-16 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .472.334l5.503.476c.428.037.64.57.33.996l-4.113 3.526a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.92 19.4a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.113-3.526a.562.562 0 0 1 .33-.996l5.503-.476a.563.563 0 0 0 .472-.334l2.125-5.111Z" />
            </svg>
            <span className="text-base font-medium text-gray-700">즐겨찾기</span>
          </div>

          {/* 지하철 노선도 Button */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer w-36 h-36 justify-center">
            {/* Subway Icon (Black) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-16 h-16 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.625c-.125.75-.687 1.313-1.437 1.313H5.875c-.75 0-1.313-.563-1.438-1.313L3.75 7.5m16.5 0-2.25-3m-13.5 3L3.75 4.5m 16.5 0-2.25 3m-13.5-3L3.75 7.5" />
            </svg>
            <span className="text-base font-medium text-gray-700">지하철 노선도</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full text-center py-4 bg-gray-200 text-sm text-gray-600">
        © 2025 MetroTime. Real-time subway information system
      </div>
    </div>
 )   
}
export default test