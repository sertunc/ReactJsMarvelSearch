import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import md5 from 'md5';

import NavBar from '../containers/NavBar';
import SearchBar from './search-bar';
import CharacterList from './character-list'
import Details from './details'
import ErrorMessage from '../containers/ErrorMessage';

const API_URL = 'https://gateway.marvel.com:443/v1/public/';
const publicKey = '6fb6da3f52b25f46056f4612dda84d6c';
const privateKey = 'f52746d16e3f49c5906f47d09767b23da28b69f9';
const ts = '1';
const auth = `ts=${ts}&apikey=${publicKey}&hash=${md5(`${ts}${privateKey}${publicKey}`)}`;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      characters: null,
      selectedCharacter: null
    };
  }

  componentDidMount() {
    this.GetInitialChararcters();
  }

  GetInitialChararcters() {

    const url = `${API_URL}/characters?${auth}&limit=5`;
    //this.setState({ loading: true });//birden fazla render yaptığı için kullanmadım!!!

    fetch(url)
      .then(result => result.json())
      .then(result => {

        this.setState({
          loading: false,
          error: result.error || null,
          characters: result.data.results
        });

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  CharacterSearch = (term) => {
    if (term.length === 0) {
      this.setState({ error: "Arama Kriteri Boş Geçilemez!" });
      return;
    }

    const url = `${API_URL}/characters?${auth}&limit=5&nameStartsWith=${term}`;

    fetch(url)
      .then(result => result.json())
      .then(result => {
        if (result.data.results.length === 0) {
          this.setState({ error: "Sonuç Bulunamadı!" });
          return;
        }

        this.setState({
          loading: false,
          error: result.error || null,
          characters: result.data.results
        });

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  handleCharacterSelect = (character) => {
    this.setState({ selectedCharacter: character });
  }

  render() {
    let showErrorComponent;

    if (!this.state.characters) return <h1>Yükleniyor...</h1>;

    if (this.state.error) {
      showErrorComponent = <ErrorMessage errorMessage={this.state.error} />
    }

    return (
      <div className="container">
        <NavBar />

        <SearchBar onSearchButtonClick={this.CharacterSearch} />

        {showErrorComponent}

        <CharacterList
          characters={this.state.characters}
          onCharacterSelect={this.handleCharacterSelect} />

        <Details character={this.state.selectedCharacter || this.state.characters[0]} />
      </div>
    );
  }


}

export default App;