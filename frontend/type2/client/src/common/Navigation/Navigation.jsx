import styles from './Navigation.module.css';
import FavoriteIcon from "../../assets/icons/favorite_icon.jsx";
import HomeIcon from "../../assets/icons/home_icon.jsx";
import MyPageIcon from "../../assets/icons/mypage_icon.jsx";
import SearchIcon from "../../assets/icons/search_icon.jsx";
import SupplementsIcon from "../../assets/icons/supplements_icon.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";

function Navigation() {
    const [active, setActive] = useState(1);

    const menuItmes = [
        {id: 3, icon: <SearchIcon/>, path: "/search", label: "Search"},
        {id: 2, icon: <SupplementsIcon/>, path: "/recommend", label: "Supplements"},
        {id: 1, icon: <HomeIcon/>, path: "/", label: "Home"},
        {id: 4, icon: <FavoriteIcon/>, path: "/", label: "Favorite"},
        {id: 5, icon: <MyPageIcon/>, path: "/mypage", label: "MyPage"}
    ]


    return (
        <div className={styles.navBar_wrapper}>
            <nav className={styles.navBar}>
                <ul>
                    {menuItmes.map((item) => (
                        <li key={item.id}
                            onClick={() => setActive(item.id)}
                            className={active === item.id ? styles.active : ""}>
                            <Link to={item.path}>
                                {item.icon}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;