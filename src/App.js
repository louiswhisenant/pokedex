import { useState, useContext } from 'react';
import { StoreContext } from './context/Context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';

import './assets/css/styles.css';
import { Spinner } from 'reactstrap';

const App = () => {
	const [loading, setLoading] = useState(true);
	const {
		caught: [caught, setCaught],
	} = useContext(StoreContext);

	if (loading) {
		if (localStorage.caughtPokemon) {
			const data = localStorage.getItem('caughtPokemon');

			setCaught(JSON.parse(data));
		}
		setLoading(false);
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		!loading && (
			<Router>
				<Switch>
					<Route exact path='/' component={Pokedex} />
					<Route
						exact
						path='/pokemon/:id'
						component={PokemonDetails}
					/>
				</Switch>
			</Router>
		)
	);
};

export default App;
