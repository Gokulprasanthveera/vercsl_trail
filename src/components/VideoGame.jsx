import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loadingspinner from "./Loadingspinner";
import Error from "./Error";

const VideoGame = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGame, setSearchedGame] = useState([]);
  const [gameDeals, setGameDeals] = useState([]);
  const [id, setId] = useState(1);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling

  const searchGame = () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=4`)
      .then((response) => response.json())
      .then((data) => {
        setSearchedGame(data);
        setLoading(false); // End loading
      })
      .catch((err) => {
        setError(true);
        setLoading(false); // End loading
      });
  };

  

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex items-start justify-center mb-10 mt-5">
          <input
            type="text"
            placeholder="Search for a game..."
            onChange={(e) => setGameTitle(e.target.value)}
            className="input input-bordered join-item"
          />

          <button onClick={searchGame} className="btn join-item rounded-r-full">
            Search
          </button>
        </div>

        {/* Display error message if any */}
        {error && <Error />}

        {/* Display loading spinner */}
        {loading && <Loadingspinner />}

        {!loading && !error && (
          <table className="table">
            {/* Table Head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Game ID</th>
                <th>Cheapest Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through searchedGame data */}
              {searchedGame.map((game) => (
                <tr key={game.gameID}>
                  <th>
                    <input type="checkbox" className="checkbox" />
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={game.thumb} alt={game.external} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{game.external}</div>
                      </div>
                    </div>
                  </td>
                  <td>{game.gameID}</td>
                  <td>{game.cheapest}$</td>
                  <th>
                    {/* <Link to="/details">
                      <button className="btn btn-ghost btn-xs">Details</button>
                    </Link> */}
                  </th>
                </tr>
              ))}
            </tbody>
            {/* Table Footer */}
            {/* <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Game ID</th>
                <th>Cheapest Price</th>
                <th></th>
              </tr>
            </tfoot> */}
          </table>
        )}
      </div>
    </>
  );
};

export default VideoGame;
