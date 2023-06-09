import "./App.css";

import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from 'react';

import AboutView from "./components/AboutView";
import ComingSoon from './components/ComingSoon';
import Home from "./components/Home";
import MovieView from './components/MovieView';
import Navbar from "./components/Navbar";
import SearchView from './components/SearchView';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if(searchText) {      fetch(`https://api.themoviedb.org/3/search/movie?api_key=ab166ff82684910ae3565621aea04d62&language=en-US&query=${searchText}&page=1&include_adult=false`)

        .then(response => response.json())
        .then(data => {
          setSearchResults(data.results)
        })
    }
  }, [searchText])


  return (
    <div>
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" component={AboutView} />
      <Route path="/comingsoon" component={ComingSoon} />  
        <Route path="/search">
          <SearchView keyword={searchText} searchResults={searchResults} />
        </Route>
        <Route path="/movies/:id" component={MovieView} />
      </Switch>
    </div>
  );
}

export default App;
