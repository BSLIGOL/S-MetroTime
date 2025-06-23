// Item.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import './Item.css';
import { getLineColor } from '../utils/lineColor'; // 실제 위치에 맞게 조정

const Item = ({ stationName, lineNumber, handleDelete }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const bgColor = getLineColor(lineNumber);

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    // Result 페이지로 이동하면서 stationName과 lineNumber를 URL 파라미터로 전달
    navigate(`/result/${stationName}/${lineNumber}`);
  };

  return (
    // 전체 range div에 클릭 이벤트 추가
    <div className="range" onClick={handleClick} style={{ cursor: 'pointer' }}> {/* 클릭 가능하도록 커서 스타일 추가 */}
      <div className="Item">
        <div className="name">{stationName}</div>
        <div
          className="number"
          style={{ backgroundColor: bgColor, color: 'white' }}
        >
          {lineNumber}
        </div>
        {/* 삭제 버튼은 클릭 이벤트가 전파되지 않도록 stopPropagation 추가 */}
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