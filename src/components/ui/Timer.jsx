import React from 'react'
import { getLineColor } from '../../utils/lineColor'
import { subwayIdToLineNumber } from '../../utils/lineToSubwayNm'

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

    return (
        <div>
            {subwayArrival.map((train, index) => {
                const lineName = subwayIdToLineNumber[train.subwayId];
                const lineColor = getLineColor(lineName);

                const arrivalInSeconds = parseInt(train.barvlDt, 10);
                const currentTime = new Date();
                const arrivalTime = new Date(currentTime.getTime() + arrivalInSeconds * 1000);

                const formatTime = (date) => {
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`;
                };

                return (
                    <div key={index} className="mb-4 p-3 rounded border">
                        <p className="font-semibold">{train.bstatnNm}행</p>
                        <p className="text-red-500">
                            {arrivalInSeconds
                                ? `${Math.floor(arrivalInSeconds / 60)}분`
                                : '정보 없음'}
                        </p>
                        <p>{formatTime(arrivalTime)}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Timer
