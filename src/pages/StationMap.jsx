import Search from "../components/ui/Search";
import StationLineMap from "../assets/StationMap.png";
import BackBotton from "../assets/BackBotton.png";
import { useNavigate } from "react-router-dom";
import usePageTitle from '../hooks/usePageTitle';

function StationMap() {

    usePageTitle('지하철 노선도');

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }

  return (
    <div className="flex flex-col items-center flex-grow">
        <Search />

        <div className="flex flex-row items-start justify-center">
            <div className="flex flex-col justify-start mt-4 mr-2">
                <img
                src={BackBotton}
                alt="BackBotton"
                onClick={handleBack}
                className="w-8 h-8 cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95"
                />
            </div>
            <img
                src={StationLineMap}
                alt="StationLineMap"
                className="border-2 border-gray-200 w-3/5 h-3/5"
            />
        </div>
    </div>
  );
}

export default StationMap;
