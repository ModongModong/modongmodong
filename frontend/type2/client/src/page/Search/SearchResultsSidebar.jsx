import styles from "./SearchResultsSidebar.module.css";
import { BsDashLg } from "react-icons/bs";

const SearchResultsSidebar = ({ searchResults, isSidebarOpen, setIsSidebarOpen}) => {
    return (
        <div className={`${styles.list_container} ${isSidebarOpen ? styles.open : ""}`}>
            {isSidebarOpen && (
                <div className={styles.result_area}>
                    {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                            <div key={result.id || index} className={styles.result_item}>
                                <h5>{result.place_name}</h5>
                                <p className={styles.road_address_name}>{result.road_address_name}</p>
                                <p className={styles.address_name}>{result.address_name}</p>
                                <p className={styles.distance_phone}>{(result.distance / 1000).toFixed(1)}km
                                    | {result.phone}</p>
                                <a href={result.place_url} target="_blank" rel="noopener noreferrer">
                                    자세히 보기
                                </a>
                            </div>
                        ))
                    ) : (
                        <div>검색결과가 없어요ㅠ</div>
                    )}
                </div>
            )}
            <button
                className={styles.sidebar_open_btn}
                onClick={() => setIsSidebarOpen(prev => !prev)}
            >
               <BsDashLg/>
            </button>
        </div>
    )
};

export default SearchResultsSidebar;