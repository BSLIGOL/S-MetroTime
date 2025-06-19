// Body.jsx
import React from 'react';
import Item from '../components/Item';
import './Body.css';

const Body = ({ isBookmarkPage }) => {
  let data = [];

  if (isBookmarkPage) {
    const stored = localStorage.getItem('bookmarks');
    data = stored ? JSON.parse(stored) : [];
  } else {
    // 전체역 데이터 혹은 기본값
    data = []; // 이건 나중에 context로 바꿀 수도 있음
  }

  return (
    <div className="Body">
      {data.length === 0 ? (
        <p className="no-result">표시할 역이 없습니다.</p>
      ) : (
        data.map((item, index) => (
          <Item
            key={index}
            stationName={item.stationName}
            lineNumber={String(item.lineNumber)}
          />
        ))
      )}
    </div>
  );
};

export default Body;
