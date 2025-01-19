import {MapMarker} from "react-kakao-maps-sdk";
import myLoactionBlue from "../../assets/Images/my_location_ blue.png";

const CurrentLocationMarker = ({position}) =>(
    <MapMarker
        position={position}
        image={{
            src: myLoactionBlue,
            size:{width:50, height:50},
        }}
    />
)

export default CurrentLocationMarker;