import React, { createContext, useState, useContext, useEffect } from 'react';
import * as XLSX from 'xlsx';

const StationListContext = createContext();

export const StationListProvider = ({ children }) => {
    const [stationList, setStationList] = useState([]);

    // public 폴더의 Station.xlsx를 불러오기
    useEffect(() => {
        const fetchExcelFile = async () => {
            try {
                const response = await fetch('/Station.xlsx');
                if (!response.ok) {
                    throw new Error('파일을 불러올 수 없습니다.');
                }
                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setStationList(jsonData);
            } catch (error) {
                console.error('엑셀 파일 파싱 오류:', error);
            }
        };

        fetchExcelFile();
    }, []);

    return (
        <StationListContext.Provider value={{ stationList }}>
            {children}
        </StationListContext.Provider>
    );
};

export const useStationListContext = () => {
    const context = useContext(StationListContext);
    if (context === undefined) {
        throw new Error('useStationListContext는 StationListProvider 내에서 사용되어야 합니다.');
    }
    return context;
};
