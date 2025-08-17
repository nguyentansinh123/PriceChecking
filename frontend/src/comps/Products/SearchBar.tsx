import { IoSearch } from "react-icons/io5"

const SearchBar = () => {
    return (
        <div className="relative flex w-full rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IoSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search"
                className="block w-full rounded-l-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            <button
                type="button"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                Search
            </button>
        </div>

    )
}

export default SearchBar
