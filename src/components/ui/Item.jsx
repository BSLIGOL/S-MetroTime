import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Item.css';
import { getLineColor } from '../../utils/lineColor';

const Item = ({ stationName, lineNumber, handleDelete }) => {
  const navigate = useNavigate();
  const bgColor = getLineColor(lineNumber);

  const handleClick = () => {
    // Result 페이지로 이동하면서 stationName과 lineNumber를 URL 파라미터로 전달
    navigate(`/result/${stationName}/${lineNumber}`);
  };

  return (
    // 전체 range div에 클릭 이벤트 추가
    <div className="range" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="Item">
        <div className="name">{stationName}</div>
        <div
          className="number"
          style={{ backgroundColor: bgColor, color: 'white' }}
        >
          {lineNumber}
        </div>
        <button onClick={(e) => {
          e.stopPropagation(); // 부모 div의 클릭 이벤트가 실행되지 않도록 막음
          handleDelete(stationName, lineNumber);
        }}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default Item;