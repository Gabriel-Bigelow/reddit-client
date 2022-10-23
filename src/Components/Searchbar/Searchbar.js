import './Searchbar.css'
import { NavLink } from 'react-router-dom';
import logo from './logo.png';

export default function Searchbar () {
    return (
        <nav>
            
            <div class="inner" id="left-flex">
                <img id="nav-logo" src={logo} alt="a blue reddit snoo"/>
                <h1>Lurker</h1>
            </div>
            
            
            <div class="inner" id="center-flex">
                <form>
                    <input id="searchbar" placeholder='Search' />
                </form>
                <NavLink>Popular</NavLink>
            </div>

            <div class="inner" id="right-flex">
                <NavLink>Notifications</NavLink>
                <NavLink>Account</NavLink>
            </div>
        </nav>
    )
}
