import React from "react";
import Search from '../components/ui/Search';
import Body from  './BookMarkBody';
import Back from '../components/Back';

function BookMark() {
    return (
        <div>
            <span className="flex flex-col items-center flex-grow"><Search/></span>
            <Body isBookmarkPage={true}/>
            <Back/>
        </div>
    )
}

export default BookMark;
