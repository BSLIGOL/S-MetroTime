import React from 'react'

function Timer({ loading, error, subwayArrival }) {
    if (loading) {
        return <p>로딩 중...</p>
    }

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    if (subwayArrival.length === 0) {
        return <p>해당 역의 도착 정보가 없습니다.</p>
    }

    const inbound = subwayArrival.filter(train =>
        train.updnLine === "상행" || train.updnLine === "내선"
    );

    const outbound = subwayArrival.filter(train =>
        train.updnLine === "하행" || train.updnLine === "외선"
    );

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const renderTrainInfo = (train, index) => {
        const arrivalInSeconds = parseInt(train.barvlDt, 10);
        const currentTime = new Date();
        const arrivalTime = new Date(currentTime.getTime() + arrivalInSeconds * 1000);

        const isLastTrain = train.lstcarAt === "1";

        return (
            // ⭐ 부모 div에 flex-nowrap과 min-w-0을 추가하여 줄바꿈을 방지하고 내부 요소가 줄어들도록 합니다.
            <div key={index} className="flex items-center space-x-2 text-sm pl-12 pb-2 flex-nowrap min-w-0">
                <p className="flex-shrink-0">{formatTime(arrivalTime)}</p> {/* ⭐ 시간을 고정 너비로 */}
                <p className="text-red-500 flex-shrink-0"> {/* ⭐ 분을 고정 너비로 */}
                    {arrivalInSeconds
                        ? `${Math.floor(arrivalInSeconds / 60)}분`
                        : '정보 없음'}
                </p>
                {/* ⭐ trainLineNm이 표시되는 <p> 태그에 텍스트 말줄임표 스타일을 추가합니다. */}
                <p className="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis flex-grow">
                    {train.trainLineNm} {isLastTrain && <span className="text-red-600 font-semibold">[막차]</span>}
                </p>
            </div>
        );
    };

    return (
        <div className="flex gap-8 w-full p-4">
            {/* 왼쪽: 상행/내선 */}
            <div className="flex-1">
                <h2 className="text-center font-bold mb-2">상행 / 내선</h2>
                {inbound.length > 0 ? inbound.map(renderTrainInfo) : <p className="text-center text-gray-500">도착 정보 없음</p>}
            </div>

            {/* 오른쪽: 하행/외선 */}
            <div className="flex-1">
                <h2 className="text-center font-bold mb-2">하행 / 외선</h2>
                {outbound.length > 0 ? outbound.map(renderTrainInfo) : <p className="text-center text-gray-500">도착 정보 없음</p>}
            </div>
        </div>
    );
}

export default Timer;