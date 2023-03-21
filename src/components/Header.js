import { login, logout } from '../firebase.js';
import {Link} from 'react-router-dom';



const Header = ({user, getAnimalData}) => {
  return (
    <nav className='nav'>
        <Link to='/' className="headerDiv" >
            <div  >Pet Purpose App</div>
        </Link>
<ul className='user-header'>



    {user ? (
        <>
        {/* add link to Favorites.js page */}
        <Link to='/favorites' className='favorites-link' >
            <div className="favorites">View Favorites</div>
        </Link>
        <Link to='/history' className='history-link' onClick = {()=> getAnimalData() } >
            <div className="history">View History</div>
        </Link>


            <li className="welcome">Welcome, {user.displayName}
            <li className='pic-google-li'>
               <img className='google-profile-pic' src={user.photoURL} alt={user.displayName} /> 
            </li>
            
           </li>
            <li className="buttonArea">
                <button className='logoutButton' onClick={logout}>Logout</button>
            </li>
        </>
    ) : (
        <li>
            <button className='loginButton'onClick={login}>Login</button>
        </li>
    )}
</ul>
</nav>
  )
}

export default Header;