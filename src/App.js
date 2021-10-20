import { useEffect, useState } from 'react';
import { PokemonContext } from './PokemonContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';

import './assets/css/styles.css';
import { Spinner } from 'reactstrap';

const App = () => {
	const [loading, setLoading] = useState(true);
	const [appState, setAppState] = useState({
		caught: [],
		pokemon: [],
		filter: 'all',
		searchResults: [],
		searchTerm: '',
	});

	if (loading) {
		if (localStorage.caughtPokemon) {
			const data = localStorage.getItem('caughtPokemon');
			setAppState({ ...appState, caught: JSON.parse(data) });
		}
		setLoading(false);
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		!loading && (
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
		)
	);
};

export default App;
