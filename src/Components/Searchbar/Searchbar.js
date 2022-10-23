import './Searchbar.css'
import logo from './logo.png';
import searchIcon from './searchIcon.png';

export default function Searchbar () {
    return (
        <nav>
            <img id="nav-logo" src={logo} alt="a blue reddit snoo"/>
            <form>
                <input id="searchbar" placeholder='Search' />
            </form>
        </nav>
    )
}
