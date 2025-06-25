export const fetchSubwayArrival = async (stationName) => {
    if (!stationName) {
        throw new Error("역 이름을 입력해주세요.");
    }

    // Vercel 서버리스 함수를 호출하는 URL입니다.
    // '/api'는 Vercel이 기본적으로 서버리스 함수를 호스팅하는 경로 접두사입니다.
    // 'subway-arrival'은 서버리스 함수의 파일 이름(`api/subway-arrival.js`)입니다.
    const url = `/api/subway-arrival?stationName=${encodeURIComponent(stationName)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
        if (data.message) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
        throw new Error(`데이터를 불러오는데 실패했습니다: ${error.message}`);
    }
}