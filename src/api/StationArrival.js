import AUTH_KEY from '../apikey';

export const fetchSubwayArrival = async (stationName) => {
    if(!stationName) {
        throw new Error("역 이름을 입력해주세요.");
    }

    const url = `http://swopenAPI.seoul.go.kr/api/subway/${AUTH_KEY}/json/realtimeStationArrival/0/20/${stationName}`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.errorMessage && data.errorMessage.status !== 200) {
        throw new Error(data.errorMessage.message || "데이터를 불러오는데 실패했습니다.");
    }

    if(!data.realtimeArrivalList) {
        throw new Error("도착 정보가 없거나, 역 이름을 정확히 입력했는지 확인해주세요.");
    }

    return data.realtimeArrivalList;
}