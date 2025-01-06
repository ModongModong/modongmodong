import styles from './Navigation.module.css';
import FavoriteIcon from "../../assets/icons/favorite_icon.jsx";
import HomeIcon from "../../assets/icons/home_icon.jsx";
import MyPageIcon from "../../assets/icons/mypage_icon.jsx";
import SearchIcon from "../../assets/icons/search_icon.jsx";
import SupplementsIcon from "../../assets/icons/supplements_icon.jsx";
import {useState} from "react";

function Navigation() {
    const [active, setActive] = useState(1);

    const menuItmes = [
        {id: 1, icon: <SearchIcon/>, path: "/", label: "Search"},
        {id: 2, icon: <SupplementsIcon/>, path: "/", label: "Supplements"},
        {id: 3, icon: <HomeIcon/>, path: "/", label: "Home"},
        {id: 4, icon: <FavoriteIcon/>, path: "/", label: "Favorite"},
        {id: 5, icon: <MyPageIcon/>, path: "/", label: "MyPage"}
    ]


    return (
        <nav className={styles.navBar}>
            <ul>
                {menuItmes.map((item) => (
                    <li key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? styles.active : ""}>
                        <a href={item.path}>
                            {item.icon}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navigation;
