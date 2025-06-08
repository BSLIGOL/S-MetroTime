import React, { createContext, useState, useContext } from 'react';
import AUTH_KEY from '../apikey';
const SubwayArrivalContext = createContext();

export const SubwayArrivalProvider = ({ children }) => {
    const [subwayArrivalData, setSubwayArrivalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSubwayArrivalData = async (stationName) => {
        setLoading(true);
        setError(null);
        setSubwayArrivalData([]);

        if(!stationName) {
            setError("역 이름을 입력해주세요.")
            setLoading(false);
            return;
        }

        const url = `http://swopenAPI.seoul.go.kr/api/subway/${AUTH_KEY}/json/realtimeStationArrival/0/20/${stationName}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if(data.errorMessage && data.errorMessage.status != 200) {
                setError(data.errorMessage.message ||  "데이터를 불러오는데 실패했습니다.");
                setSubwayArrivalData([]);
            } else if (data.realtimeArrivalList) {
                setSubwayArrivalData(data.realtimeArrivalList)
            } else {
                setError("도착 정보가 없거나, 역 이름을 정확히 입력했는지 확인해주세요.")
                setSubwayArrivalData([])
            }
        } catch(err) {
            console.error("데이터 호출 오류:", err);
            setError("네트워크 오류 또는 서버 응답 문제");
            setSubwayArrivalData([])
        } finally {
            setLoading(false);
        }
    }

    return (
        <SubwayArrivalContext.Provider
        value={{subwayArrivalData, loading, error, fetchSubwayArrivalData}}>
            {children}
        </SubwayArrivalContext.Provider>
    )
}

export const useSubwayArrivalContext = () => {
    const context = useContext(SubwayArrivalContext);
    if(context === undefined) {
        throw new Error('useSubwayArrival Hook은 SubwayArrivalProvider 내에서 사용되어야 합니다.');
    }
    return context;
}