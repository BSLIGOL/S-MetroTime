import SearchIcon from '../../assets/SearchIcon.png'

function Search() {
    return (
        <div className={`flex flex-row w-2/6 m-6 border border-gray-300 rounded-lg overflow-hidden mt-28 mb-8`}>
            <input type="text" placeholder="역을 입력하세요" className="flex-grow p-2 outline-none border-none" />
            <button className="p-2">
                <img src={SearchIcon} alt="Search" className="w-5 h-5"/>
            </button>
        </div>
    )
}

export default Search