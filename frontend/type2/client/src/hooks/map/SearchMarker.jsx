import {CustomOverlayMap, MapMarker} from "react-kakao-maps-sdk";
import markerImage from "../../assets/Images/marker.png";
import styles from "./Search_marker.module.css";
import React from "react";

const SearchMarker = ({marker, openMarkerId, handleMarkerClick})=> {
    return (
        <div>
            <MapMarker
                position={{ lat: marker.y, lng: marker.x }}
                image={{
                    src: markerImage,
                    size: {
                        width: 35,
                        height: 35,
                    },
                }}
                onClick={() => handleMarkerClick(marker.id, marker)}
            />

            {/* 해당 마커에 커스텀 오버레이 표시 */}
            {openMarkerId === marker.id && (
                <CustomOverlayMap position={{ lat: marker.y, lng: marker.x }} yAnchor={2.1}>
                    <div className={styles.overlay}>
                        <a
                            href={marker.place_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
                        >
                            {marker.place_name}
                        </a>
                    </div>
                </CustomOverlayMap>
            )}
        </div>
    );
};

export default SearchMarker;