import './App.css';
import Navigation from "./common/Navigation/Navigation.jsx";
import Home from "./page/Home/Home.jsx";
import AddPost from "./page/Home/Add_post.jsx";
import PostDetail from "./page/Home/PostDetail.jsx";

function App() {
    return (
       <>
           {/*<PostDetail/>*/}
           {/*<AddPost/>*/}
           <Home/>
           <Navigation/>
       </>
    );
}

export default App;
