import SearchIcon from "../assets/svg/search.svg?react";

const SearchTool = ({ defaultOpen = false }) => {
    return (
        <div className="flex items-center gap-2 bg-muted rounded-2xl p-4 mx-4 mb-2">
            <SearchIcon className="size-24 text-white" />
            <input 
                type="text" 
                placeholder="Search your favourite movie"
                className="bg-transparent text-text placeholder:text-text-secondary outline-none w-full"
                autoFocus={!defaultOpen}
            />
        </div>
    )
}

export default SearchTool;