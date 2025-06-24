// api/subway-arrival.js
// Vercel에서 이 파일을 Node.js 서버리스 함수로 배포합니다.

// node-fetch는 Vercel 런타임에 내장되어 있을 가능성이 높지만,
// 로컬 개발 환경에서 테스트 시 필요할 수 있습니다.
// 만약 'fetch is not defined' 에러가 발생하면 `npm install node-fetch` 후 아래 import 주석을 해제하세요.
// import fetch from 'node-fetch';

export default async function (req, res) {
    // 1. Vercel 환경 변수에서 API 키를 가져옵니다.
    // 이 AUTH_KEY는 Vercel 대시보드에서 설정해야 합니다.
    const AUTH_KEY = process.env.SEOUL_SUBWAY_AUTH_KEY; 
  
    // 2. 클라이언트에서 전달받은 역 이름을 쿼리 파라미터에서 가져옵니다.
    const { stationName } = req.query;
  
    if (!AUTH_KEY) {
      return res.status(500).json({ error: 'Server configuration error: API key not found.' });
    }
  
    if (!stationName) {
      return res.status(400).json({ error: 'Station name is required.' });
    }
  
    // 3. 서울시 지하철 API URL (여전히 HTTP 사용, 서버리스 함수 내부에서 호출되므로 문제 없음)
    const url = `http://swopenAPI.seoul.go.kr/api/subway/${AUTH_KEY}/json/realtimeStationArrival/0/20/${encodeURIComponent(stationName)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // 4. 서울시 API 응답을 클라이언트에게 그대로 전달하거나 필요한 부분만 필터링하여 전달
      if (data.errorMessage && data.errorMessage.status !== 200) {
        // API 오류 메시지를 클라이언트에게 전달
        return res.status(data.errorMessage.status || 500).json(data.errorMessage);
      }
  
      if (!data.realtimeArrivalList) {
        // 도착 정보가 없는 경우
        return res.status(404).json({ message: "도착 정보가 없거나, 역 이름을 정확히 입력했는지 확인해주세요." });
      }
  
      // 5. 성공적으로 데이터를 가져왔다면 클라이언트에게 JSON 형태로 전달
      res.status(200).json(data.realtimeArrivalList);
  
    } catch (error) {
      console.error('Error in serverless function:', error);
      // 내부 서버 오류 발생 시
      res.status(500).json({ error: 'Failed to fetch subway data due to an internal server error.' });
    }
  }