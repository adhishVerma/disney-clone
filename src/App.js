import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import useUser from "./functions/Store";
import Detail from "./components/Detail";
import Catalogue from "./components/Catalogue";
import { Pixar } from "./components/Pixar";
import { StarWars } from "./components/StarWars";
import { Anime } from "./components/Anime";
import AnimeDetail from "./components/AnimeDetail";
import { WatchList } from "./components/WatchList";

function App() {
  const userState = useUser((state) => state.user);

  return (
    <div className="App">
      <Router>
        <Navbar user={userState} />
        <Routes>
          <Route path="/" element={<Home userState={userState} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalogue/:id" element={<Catalogue />} />
          <Route path="/pixar" element={<Pixar/>}/>
          <Route path="/star-wars" element={<StarWars/>}/>
          <Route path="/anime" element={<Anime/>}/>
          <Route path="/anime/:id" element={<AnimeDetail/>}/>
          <Route path="/detail/:type/:id" element={<Detail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
