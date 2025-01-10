import styles from "./Search_pharmacy.module.css";
import GobackIcon from "../../assets/icons/goback_icon.jsx";
import { useEffect, useState } from "react";
import KakaoMap from "../../hooks/map/Bring_kakao_map.jsx";
import SearchResultsSidebar from "./Search_results_sidebar.jsx";
import KeywordBtn from "./Keyword_btn.jsx";
import {useNavigate} from "react-router-dom";

const SEARCH_KEYWORD = [
    { id: 1, value: "동물병원", emoji: "🩺" },
    { id: 2, value: "반려동물용품점", emoji: "💊" },
    { id: 3, value: "24시 동물병원", emoji:"🚨"}
];

function SearchPharmacy() {
    const [map, setMap] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [activeKeywordId, setActiveKeywordId] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openMarkerId, setOpenMarkerId] = useState(null);
    const navigate = useNavigate();
    const [state, setState] = useState({
        center: {
            lat: 37.574187,
            lng: 126.976882,
        },
        errMsg: null,
        isLoading: true,
    });

    //뒤로가기 버튼
    const goBack = () => {
        navigate(-1);
    };

    // 현재 사용자 위치 받아오기
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                        isLoading: false,
                    }));
                },
                (err) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }));
                },
            );
        } else {
            setState((prev) => ({
                ...prev,
                errMsg: "Geolocation을 활성화 해주세요",
                isLoading: false,
            }));
        }
    }, []);

    useEffect(() => {
        if (state.center && !state.isLoading) {
            searchPlaces("동물병원", 1);
        }
    }, [state.center]);

    useEffect(()=>{
        if(!map) return;
        setOpenMarkerId(null);
        searchPlaces("동물병원", 1)
    },[map])

    useEffect(() => {
        if (map && state.center && !state.isLoading) {
            setOpenMarkerId(null);
            searchPlaces("동물병원", 1);
        }
    }, [map, state.center, state.isLoading]);

    const searchPlaces = (keyword, id) => {
        if (!state.center) return;
        setActiveKeywordId(id);
        const ps = new kakao.maps.services.Places();
        const options = {
            location: new kakao.maps.LatLng(state.center.lat, state.center.lng),
            radius: 5000,
            sort: kakao.maps.services.SortBy.DISTANCE,
        };

        ps.keywordSearch(
            keyword, (data, status, pagination) => {
                if (status === kakao.maps.services.Status.OK) {
                    console.log("Search Results:", data);
                    displayPlaces(data);
                    setSearchResults(data);
                } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                    setSearchResults(data);
                } else if (status === kakao.maps.services.Status.ERROR) {
                    alert("검색에 실패했습니다");
                }
            },
            options,
        );
    };

    const onMapCreate = (mapInstance) => {
        setMap(mapInstance);  // map 객체를 상태에 저장
    };

    const displayPlaces = (data) => {
        if (!map) return;
        const bounds = new kakao.maps.LatLngBounds();
        data.forEach((item) => bounds.extend(new kakao.maps.LatLng(item.y, item.x)));
        bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng));
        map.setBounds(bounds);
        setSearchResults(data);
    }

    // 마커의 위치로 지도의 중심 좌표 이동하기
    const moveLatLng = (data) => {
        const newLatLng = new kakao.maps.LatLng(data.y, data.x);
        map.panTo(newLatLng);
    }

    // 마커 클릭 시 CustomOverlayMap를 열고 닫는 함수
    useEffect(() => {
        if(!map) return;
        const clickListner = () => {setOpenMarkerId(null);
        };
        kakao.maps.event.addListener(map, "click", clickListner);

        return () => {
            kakao.maps.event.removeListener(map, "click", clickListner);
        }
    }, [map]);

    return (
        <div className={styles.search_wrapper}>
            <div className={styles.search_area}>
                <div onClick={goBack}>
                    <GobackIcon/>
                </div>
                <div className={styles.title_area}>
                    <h3>내 주변 병원 / 용품점 찾기</h3>
                </div>
            </div>
            <div className={styles.map_area}>
                <div className={styles.map_wrppaer}>
                    <KakaoMap
                        center={state.center}
                        markers={searchResults}
                        level={3}
                        onMapCreate={onMapCreate}
                        openMarkerId={openMarkerId}
                        setOpenMarkerId={setOpenMarkerId}
                        moveLatLng={moveLatLng}
                    />
                    <SearchResultsSidebar
                        searchResults={searchResults}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                </div>
                <div className={styles.btn_wrapper}>
                    {SEARCH_KEYWORD.map((keyword) => (
                        <KeywordBtn
                            key={keyword.id}
                            keyword={keyword}
                            activeKeywordId={activeKeywordId}
                            searchPlaces={searchPlaces}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPharmacy;
