import './navbar.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import M from "materialize-css/dist/js/materialize.min.js"

const onSidenavClose = () => {
    const elem = document.querySelector(".sidenav");
    const instance = M.Sidenav.getInstance(elem);
    if (instance.isOpen) {
        instance.close();
    }
}

const Navbar = () => {
    useEffect(() => {
        let sidenav = document.querySelector("#mobile-links");
        M.Sidenav.init(sidenav, {});
    }, []);

    return (
        <>
            <div className="navbar-fixed">
                <nav className="nav-wrapper indigo">
                    <div className="container">
                        <Link to='/' className="brand-logo">Mahakoshal Lube Automobiles </Link>
                        <a href="#" className="sidenav-trigger" data-target="mobile-links">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/users'>Users</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                            {/* <li><Link to='/notification' className="btn-floating z-depth-0 indigo darken-4">
                                <i className="material-icons">notifications</i>
                            </Link></li>
                            <li><span className="badge white-text new pink">0</span></li> */}
                        </ul>
                    </div>
                </nav>
            </div>

            <ul className="sidenav" id="mobile-links">
                <li ><Link onClick={onSidenavClose}><i className="material-icons right">close</i></Link></li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/users'>Users</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>
        </>
    );
}

export default Navbar;
