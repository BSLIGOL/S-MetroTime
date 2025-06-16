import { useContext } from 'react';
import { StationListContext } from './StationListContext';

export const useStationListContext = () => {
    const context = useContext(StationListContext);
    if (!context) {
        throw new Error('useStationListContext는 StationListProvider 내에서 사용되어야 합니다.');
    }
    return context;
}