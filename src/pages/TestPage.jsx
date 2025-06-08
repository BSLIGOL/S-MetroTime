// src/pages/TestPage.jsx
import React, { useEffect } from 'react';
// 🚨🚨🚨 Context Hook 이름을 useSubwayArrivalContext로 변경했습니다! 🚨🚨🚨
import { useSubwayArrivalContext } from '../contexts/SubwayArrivalContext.jsx'; 
import { useNavigate } from 'react-router-dom';

function TestPage() {
    // Context에서 지하철 도착 데이터, 로딩 상태, 에러 메시지를 가져옵니다.
    // 🚨🚨🚨 훅 이름 변경 적용 🚨🚨🚨
    const { subwayArrivalData, loading, error } = useSubwayArrivalContext(); 
    const navigate = useNavigate();

    // 컴포넌트가 마운트될 때마다 또는 데이터/로딩/에러 상태가 변경될 때마다 콘솔에 출력
    useEffect(() => {
        console.log("--- TestPage 데이터 확인 시작 ---");
        console.log("로딩 중:", loading);
        console.log("에러:", error);
        console.log("지하철 도착 데이터:", subwayArrivalData);
        console.log("--- TestPage 데이터 확인 종료 ---");

    }, [subwayArrivalData, loading, error]); // navigate는 useEffect 내에서 직접 사용하지 않으므로 의존성 배열에서 제거

    // 홈으로 돌아가는 버튼 핸들러
    const handleGoBack = () => {
        navigate('/'); // 홈 페이지로 이동
    };

    return (
        <div className="flex flex-col items-center py-8 min-h-[calc(100vh-120px)]">
            <h2 className="text-2xl font-bold mb-8">테스트 페이지 (데이터 확인용)</h2>

            {/* 로딩 상태 표시 */}
            {loading && <p className="text-gray-600">데이터를 불러오는 중입니다...</p>}
            
            {/* 에러 메시지 표시 */}
            {error && (
                <div className="text-red-500 font-semibold text-center">
                    <p>{error}</p>
                    <button
                        onClick={handleGoBack}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            )}

            {/* 데이터가 있고 로딩 중도 아니고 에러도 없을 때만 데이터 표시 */}
            {!loading && !error && subwayArrivalData && subwayArrivalData.length > 0 ? (
                <div className="text-center">
                    <p className="text-lg font-medium mb-4">데이터가 성공적으로 로드되었습니다. 콘솔을 확인해주세요!</p>
                    {/* 실제 데이터를 화면에 간단히 표시 */}
                    {subwayArrivalData.map((item) => ( // key는 item의 고유한 속성을 사용하는 것이 좋습니다. 여기서는 rowNum 사용.
                        <div key={item.rowNum} className="mb-2 p-2 border rounded-md text-left">
                            <p className="font-bold">{item.trainLineNm} ({item.updnLine})</p>
                            <p>현재 위치: {item.arvlMsg3}</p>
                            <p>도착 메시지: {item.arvlMsg2}</p>
                            <p>남은 시간 (초): {item.barvlDt}</p>
                        </div>
                    ))}
                    <button
                        onClick={handleGoBack}
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            ) : (
                // 로딩 중도 아니고 에러도 없으며, 데이터가 없을 때 (초기 상태 또는 검색 결과 없음)
                !loading && !error && (!subwayArrivalData || subwayArrivalData.length === 0) && (
                    <div className="text-gray-500 text-center">
                        <p>현재 표시할 데이터가 없습니다. 홈에서 역 이름을 검색해주세요.</p>
                        <button
                            onClick={handleGoBack}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            홈으로 돌아가기
                        </button>
                    </div>
                )
            )}
        </div>
    );
}

export default TestPage;