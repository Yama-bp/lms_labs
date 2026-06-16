import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GamesGrid from "./components/GamesGrid";

function List() {
  return (
    <div>
      <Navbar active="2" />
      <GamesGrid />
      <Footer />
    </div>
  );
}

export default List;