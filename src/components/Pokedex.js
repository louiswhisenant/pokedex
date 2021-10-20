import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Button } from 'reactstrap';

import axios from 'axios';

import { PokemonContext } from '../PokemonContext';
import PokedexNav from './pokedex-nav/PokedexNav';
import Pokemon from './Pokemon';

const Pokedex = () => {
	const [limit, setLimit] = useState(20);
	const { appState, setAppState } = useContext(PokemonContext);
	const { caught, pokemon, filter, searchResults, searchTerm } = appState;

	const loadMore = pokemon && (
		<Button
			onClick={() => {
				setLimit(limit + 20);
			}}>
			Load More
		</Button>
	);

	const mapResults = (req, filter, limit) => {
		let res;
		const items = req.filter((el, index) => index <= limit);

		switch (filter) {
			case 'caught':
				res = items.map(
					(result) =>
						caught.includes(result.name) && (
							<Pokemon pokemon={result} key={result.name} />
						)
				);
				break;

			case 'uncaught':
				res = items.map(
					(result) =>
						!caught.includes(result.name) && (
							<Pokemon pokemon={result} key={result.name} />
						)
				);
				break;

			case 'all':
			default:
				res = items.map((result) => (
					<Pokemon pokemon={result} key={result.name} />
				));
		}

		return res;
	};

	const getPokemon = async () => {
		const res = await axios.get(
			'https://pokeapi.co/api/v2/pokemon?limit=898'
		);

		setAppState({ ...appState, pokemon: res.data.results });
	};

	useEffect(() => {
		getPokemon();
		// eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			<PokedexNav />

			{pokemon && (
				<Container>
					<div className='pokedex'>
						{searchTerm.length > 2 && searchResults.length < 1 ? (
							<div className='no-results'>
								Sorry, no results found for search '
								<strong>{searchTerm}</strong>
								.'
							</div>
						) : searchResults.length > 0 ? (
							mapResults(searchResults, filter, 898)
						) : (
							mapResults(pokemon, filter, limit)
						)}
						<Button className='load-more'>{loadMore}</Button>
					</div>
				</Container>
			)}
		</Fragment>
	);
};

export default Pokedex;
