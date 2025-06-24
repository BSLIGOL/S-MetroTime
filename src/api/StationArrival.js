// src/api/StationArrival.js

// 이제 AUTH_KEY는 서버리스 함수에서 관리하므로 여기서 import 할 필요가 없습니다.
// import AUTH_KEY from '../apikey'; // 이 줄은 제거하거나 주석 처리합니다.

export const fetchSubwayArrival = async (stationName) => {
    if (!stationName) {
        throw new Error("역 이름을 입력해주세요.");
    }

    // Vercel 서버리스 함수를 호출하는 URL입니다.
    // '/api'는 Vercel이 기본적으로 서버리스 함수를 호스팅하는 경로 접두사입니다.
    // 'subway-arrival'은 우리가 생성한 서버리스 함수의 파일 이름(`api/subway-arrival.js`)입니다.
    const url = `/api/subway-arrival?stationName=${encodeURIComponent(stationName)}`;

    try {
        const response = await fetch(url);
        const data = await response.json(); // 서버리스 함수에서 JSON 형식으로 응답을 줍니다.

        // 서버리스 함수에서 에러를 JSON 형태로 전달했다면 여기서 처리합니다.
        if (data.error) { // 서버리스 함수에서 발생한 에러
            throw new Error(data.error);
        }
        if (data.message) { // 서버리스 함수에서 도착 정보가 없을 때 전달하는 메시지
             throw new Error(data.message);
        }

        // 성공적으로 데이터를 받았다면 반환합니다.
        return data; // 서버리스 함수가 realtimeArrivalList만 반환하도록 수정했으므로 바로 data를 반환합니다.

    } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
        throw new Error(`데이터를 불러오는데 실패했습니다: ${error.message}`);
    }
}