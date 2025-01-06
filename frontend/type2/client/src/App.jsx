import './App.css';
import Navigation from "./common/Navigation/Navigation.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pharmacy from "./page/Pharmacy.jsx";
import Home from "./page/Home.jsx";
import Favorites from "./page/Favorites.jsx";

function App() {
    return (
       <>
        메인화면입니다
           <Navigation/>
       </>
    );
}

export default App;
