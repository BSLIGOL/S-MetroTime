import './Search.css'
import SearchIcon from '../assets/SearchIcon.png'
import { Link } from 'react-router-dom';
const Search = ()=> {
  return(
    <div className='Search'>
      <input type='text' placeholder='&nbsp;&nbsp;&nbsp;역을 입력하세요'/>
      <Link to="#">
        <button>
          <img src={SearchIcon} alt='Search'/>
        </button>
      </Link>
    </div>
  )
};

export default Search;