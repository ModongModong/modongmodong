import './App.css';
import Navigation from "./common/Navigation/Navigation.jsx";
import Home from "./page/Home/Home.jsx";
import AddPost from "./page/Home/Add_post.jsx";

function App() {
    return (
       <>
           {/*<AddPost/>*/}
           <Home/>
           <Navigation/>
       </>
    );
}

export default App;
