import './App.css';
import Navigation from "./common/Navigation/Navigation.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pharmacy from "./page/Pharmacy.jsx";
import Home from "./page/Home/Home.jsx";
import Favorites from "./page/Favorites.jsx";

function App() {
    return (
       <>
           <Home/>
           <Navigation/>
       </>
    );
}

export default App;
