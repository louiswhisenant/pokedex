import { useEffect, useState } from 'react';
import { PokemonContext } from './PokemonContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';

import './assets/css/styles.css';

const App = () => {
	const [appState, setAppState] = useState({
		caught: [],
		all: [],
		filter: 'all',
		searchResults: [],
		searchTerm: '',
	});

	useEffect(() => {
		if (localStorage.caughtPokemon) {
			const data = localStorage.getItem('caughtPokemon');
			setAppState({ ...appState, caught: JSON.parse(data) });
		}
		// eslint-disable-next-line
	}, []);

	return (
		<Router>
			<PokemonContext.Provider value={{ appState, setAppState }}>
				<Switch>
					<Route exact path='/' component={Pokedex} />
					<Route
						exact
						path='/pokemon/:id'
						component={PokemonDetails}
					/>
				</Switch>
			</PokemonContext.Provider>
		</Router>
	);
};

export default App;
