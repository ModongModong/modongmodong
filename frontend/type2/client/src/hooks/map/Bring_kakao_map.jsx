import { Map } from "react-kakao-maps-sdk";
import CurrentLocationMarker from "./Current_location_marker.jsx";
import SearchMarker from "./Search_marker.jsx";
import {useState} from "react";

const KakaoMap = ({ center, markers, level = 3, onMapCreate, moveLatLng }) => {
    const [openMarkerId, setOpenMarkerId] = useState(null);

    const handleMarkerClick = (markerId, marker) => {
        if (markerId === openMarkerId) {
            setOpenMarkerId(null); // 마커 클릭 시 오버레이 닫기
        } else {
            setOpenMarkerId(markerId); // 마커 클릭 시 오버레이 열기
            moveLatLng(marker); // 마커 클릭 시 해당 위치로 지도 이동
        }
    };

    return (
        <Map
            center={center}
            style={{
                width: "100%",
                height: "460px",
            }}
            level={level}
            onCreate={onMapCreate}
        >
            {/* 현재 위치 마커 */}
            <CurrentLocationMarker position={center}/>

            {/* 검색된 장소 마커 */}
            {markers.map((marker) => (
                <SearchMarker
                    key={marker.id}
                    marker={marker}
                    openMarkerId={openMarkerId}
                    handleMarkerClick={handleMarkerClick}
                />
            ))}
        </Map>
    );
};

export default KakaoMap;
