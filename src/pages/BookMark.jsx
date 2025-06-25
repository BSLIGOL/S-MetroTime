import React from "react";
import Search from '../components/ui/Search';
import Body from  './BookMarkBody';
import Back from '../components/ui/Back';
import usePageTitle from '../hooks/usePageTitle';

function BookMark() {
    usePageTitle('즐겨찾기');
    return (
        <div>
            <span className="flex flex-col items-center flex-grow"><Search/></span>
            <Body /> {/* isBookmarkPage={true} 제거 */}
            <Back/>
        </div>
    )
}

export default BookMark;