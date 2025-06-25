import React from 'react'; // useState, useEffect 제거
import Item from '../components/ui/Item';
import './BookMarkBody.css';
import useBookmarks from '../hooks/useBookmarks'; // useBookmarks 훅 임포트

const Body = () => { // isBookmarkPage prop 제거
  // useBookmarks 훅을 사용하여 북마크 목록과 삭제 함수를 가져옵니다.
  const { bookmarks, removeBookmark } = useBookmarks();

  // handleDelete 함수는 이제 useBookmarks에서 제공하는 removeBookmark를 직접 사용합니다.
  const handleDelete = (stationName, lineNumber) => {
    removeBookmark(stationName, lineNumber);
  };

  return (
    <div className="Body">
      {bookmarks.length === 0 ? ( // data 대신 bookmarks 사용
        <p className="no-result">즐겨찾기 목록이 비어있습니다.</p>
      ) : (
        bookmarks.map((bookmark, index) => ( // data 대신 bookmarks 사용
          <Item
            key={`${bookmark.stationName}-${bookmark.lineNumber}`} // 고유한 key 사용
            stationName={bookmark.stationName}
            lineNumber={bookmark.lineNumber}
            handleDelete={handleDelete} // handleDelete 함수 전달
          />
        ))
      )}
    </div>
  );
};

export default Body;