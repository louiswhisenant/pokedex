import { useState, useContext, useEffect } from 'react';
import { StoreContext } from './context/Context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';

import './assets/css/styles.css';
import { Spinner } from 'reactstrap';

const App = () => {
	const [loading, setLoading] = useState(true);
	const {
		// eslint-disable-next-line no-unused-vars
		caught: [caught, setCaught],
	} = useContext(StoreContext);

	useEffect(() => {
		if (loading) {
			if (localStorage.caughtPokemon) {
				const data = localStorage.getItem('caughtPokemon');

				setCaught(JSON.parse(data));
			}
			setLoading(false);
		}
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Pokedex} />
				<Route exact path='/pokemon/:id' component={PokemonDetails} />
			</Switch>
		</Router>
	);
};

export default App;
