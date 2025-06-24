import { useNavigate } from 'react-router-dom';
import './NotFounds.css'
import usePageTitle from '../hooks/usePageTitle';
const NotFounds = ()=> {
    const navigate = useNavigate();
    usePageTitle('404 Not Found');

    const handleClick = ()=> {
    navigate('/');
    };
    return(
    
    <div className="NotFounds">
        <div className="Not1">&nbsp;Error</div>
        <div className='Not2'>해당 데이터가 없습니다. 불편을 끼쳐 죄송합니다.<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
        <button onClick={handleClick}>Home</button>
    </div>
    
    )
}

export default NotFounds;
