import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GamesGrid from "./components/GamesGrid";
import { fetchGames } from '../api';

function List() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchGames({ per_page: '100' });
      if (data.success) setGames(data.games);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      <Navbar active="2" />
      {loading ? <div>Загрузка...</div> : <GamesGrid data={games} />}
      <Footer />
    </div>
  );
}

export default List;