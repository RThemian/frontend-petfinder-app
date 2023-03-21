import { login, logout } from '../firebase.js';
import {Link} from 'react-router-dom';



const Header = ({user, getAnimalData, getPets}) => {
  return (
    <nav className='nav'>
        <div className='row-header-spaced'>

        <Link to='/' className="headerDiv" >
            <div  >Pet Purpose App</div>
        </Link>
        <Link to='/favorites' className='headerDiv' onClick={()=>getPets()}>
            <div className="favorites">View Favorites</div>
        </Link>
        <Link to='/history' className='headerDiv' onClick = {()=> getAnimalData() } >
            <div className="history">View History</div>
        </Link>
        </div>
<ul className='user-header'>



    {user ? (
        <>
        {/* add link to Favorites.js page */}
        


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