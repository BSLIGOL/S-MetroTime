import React from 'react';
import './Item.css';
import { getLineColor } from '../utils/lineColor'; // 실제 위치에 맞게 조정

const Item = ({ stationName, lineNumber, handleDelete }) => {
  const bgColor = getLineColor(lineNumber); // "2호선", "경의중앙선" 등 그대로 사용

  return (
    <div className="range">
      <div className="Item">
        <div className="name">{stationName}</div>
        <div
          className="number"
          style={{ backgroundColor: bgColor, color: 'white' }}
        >
          {lineNumber}
        </div>
        <button onClick={() => handleDelete(stationName, lineNumber)}>삭제</button>
      </div>
    </div>
  );
};

export default Item;
