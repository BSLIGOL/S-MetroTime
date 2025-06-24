// Body.jsx
import React, { useState, useEffect } from 'react'; // useState, useEffect 추가
import Item from '../components/ui/Item';
import './BookMarkBody.css';

const Body = ({ isBookmarkPage }) => {
  // data를 상태로 관리
  const [data, setData] = useState([]);

  // isBookmarkPage가 true일 때 localStorage에서 북마크를 불러오는 효과
  useEffect(() => {
    if (isBookmarkPage) {
      const stored = localStorage.getItem('bookmarks');
      setData(stored ? JSON.parse(stored) : []);
    } else {
      // 전체역 데이터 혹은 기본값 (여기서는 빈 배열)
      setData([]); // 이건 나중에 context로 바꿀 수도 있음
    }
  }, [isBookmarkPage]); // isBookmarkPage가 변경될 때마다 실행

  const handleDelete = (stationName, lineNumber) => {
    const key = 'bookmarks';
    const bookmarks = JSON.parse(localStorage.getItem(key)) || [];
    const updated = bookmarks.filter(
      item => !(item.stationName === stationName && item.lineNumber === lineNumber)
    );

    // 1. localStorage 업데이트
    localStorage.setItem(key, JSON.stringify(updated));

    // 2. 컴포넌트의 상태(data)도 업데이트하여 리렌더링 트리거
    setData(updated);
  };

  return (
    <div className="Body">
      {data.length === 0 ? (
        <p className="no-result">표시할 역이 없습니다.</p>
      ) : (
        data.map((item, index) => (
          <Item
            key={index}
            stationName={item.stationName}
            lineNumber={item.lineNumber}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default Body;