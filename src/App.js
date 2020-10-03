import React, { useEffect, useState } from "react";
import "./App.css";
import Chuck from "./gettyimages-83457444-612x612.jpg";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    joke: "",
    searchKeyword: "",
    searchUrl: "https://api.chucknorris.io/jokes/search?query=",
  });

  useEffect(() => {
    fetchData();
    // estlint-disable-next-line react-hooks/exhaust
  }, []);

  const fetchData = async () => {
    const result = await axios.get("https://api.chucknorris.io/jokes/random");
    console.log(result.data.value);
    setState({ ...state, joke: result.data.value });
  };

  const searchJoke = (event) => {
    setState({ ...state, searchKeyword: event.target.value });
    console.log(event.target.value);
  };

  const fetchMyJoke = async () => {
    const result = await axios.get(state.searchUrl + state.searchKeyword);
    console.log(result.data.result[0].value);
    setState({ ...state, joke: result.data.result[0].value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Chuck API</h1>
          <img src={Chuck} alt="ChuckNoris" />
        </div>
        <div className="col-6 searchJokeCol">
          <div className="card">
            <div className="card-header">
              <span>Search for the Phrase of Chuck</span>
            </div>
            <div className="card-body">
              <input type="text" onChange={searchJoke}></input>
            </div>
          </div>
          <div>
            <button onClick={fetchMyJoke} className="btn btn-warning btn-lg">
              Just CLICK!
            </button>
          </div>
        </div>
      </div>
      <h2 className="subTitle"> Here is The joke</h2>
      <h4>{state.joke}</h4>
    </div>
  );
}

export default App;
