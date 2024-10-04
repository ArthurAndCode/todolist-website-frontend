
import styles from './NavLinks.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear, faListUl } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';

function NavLinks() {
    const location = useLocation();

    return (
        <div className={styles.NavLinksContainer}>
            <div className={`${styles.NavIcon} ${location.pathname === "/profile" ? styles.inactive : ''}`}>
                <Link to="/profile">
                    <FontAwesomeIcon icon={faUserGear} />
                </Link>
            </div>
            <div className={`${styles.NavIcon} ${location.pathname === "/" ? styles.inactive : ''}`}>
                <Link to="/">
                    <FontAwesomeIcon icon={faListUl} />
                </Link>
            </div>
        </div>
    );
}

export default NavLinks;

