import React from "react";
import Search from './Search';
import Body from  '../pages/Body';
import Back from '../components/Back';

function BookMark() {
    return (
        <div>
            <Search/>
            <Body isBookmarkPage={true}/>
            <Back/>
        </div>
    )
}

export default BookMark;
