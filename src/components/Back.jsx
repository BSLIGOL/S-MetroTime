import { Link } from 'react-router-dom';
import BackBotton from '../assets/BackBotton.png'
import './Back.css'

const Back = ()=> {
  return(
    <div className='Back'>
      <Link to='/'>
        <img className='back-button' src={BackBotton} alt='BackBotton'/>
      </Link>    
    </div>
  )
}

export default Back;