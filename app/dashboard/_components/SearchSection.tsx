import { SearchIcon } from "lucide-react";
import React from "react";

function SearchSection({onSearchInput}:any) {
    return (
        <div className="flex flex-col justify-center text-white items-center p-10 bg-gradient-to-br from-orange-500 to-orange-900">
            <h2 className="text-3xl font-bold">Browse all Templates</h2>
            <p>What would you like to create today?</p>
            <div >
                <div className="flex gap-2 items-centerr p-2 my-5 border rounded-md bg-white" >
                    <SearchIcon className="text-gray-500" />
                    <input onChange={(event)=>onSearchInput(event.target.value)} type="text" placeholder="Search" className="outline-none text-black bg-transparent" />
                </div>
            </div>
        </div>
    )
}

export default SearchSection