import './Searchbar.css'
import { NavLink } from 'react-router-dom';
import logo from './logo.png';

export default function Searchbar () {
    return (
        <nav id="nav-bar">
            
            <div className="inner" id="left-flex">
                <img id="nav-logo" src={logo} alt="a blue reddit snoo"/>
                <h1 id="header">Lurker</h1>
            </div>
            
            
            <div className="inner" id="center-flex">
                <form>
                    <input id="searchbar" placeholder='Search' />
                </form>
                <NavLink>Popular</NavLink>
            </div>

            <div className="inner" id="right-flex">
                <NavLink>Notifications</NavLink>
                <NavLink>Account</NavLink>
            </div>
        </nav>
    )
}
