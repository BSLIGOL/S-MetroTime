import * as XLSX from 'xlsx';

export const fetchStationList = async () => {
    try {
        const response = await fetch('/Station.xlsx');
        if(!response.ok) {
            throw new Error('파일을 불러올 수 없습니다.');
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, {type: 'array'});
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        return jsonData;
    } catch (error) {
        console.error('엑셀 파일 파싱 오류:', error);
        return [];
    }
}