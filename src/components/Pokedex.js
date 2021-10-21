import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Button } from 'reactstrap';

import axios from 'axios';
import { StoreContext } from '../context/Context';

import PokedexNav from './pokedex-nav/PokedexNav';
import Pokemon from './Pokemon';

const Pokedex = () => {
	const [limit, setLimit] = useState(20);
	const {
		// eslint-disable-next-line no-unused-vars
		caught: [caught, setCaught],
		pokemon: [pokemon, setPokemon],
		// eslint-disable-next-line no-unused-vars
		filter: [filter, setFilter],
		// eslint-disable-next-line no-unused-vars
		searchResults: [searchResults, setSearchResults],
		// eslint-disable-next-line no-unused-vars
		searchTerm: [searchTerm, setSearchTerm],
	} = useContext(StoreContext);

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

		setPokemon(res.data.results);
	};

	useEffect(() => {
		getPokemon();
		// eslint-disable-next-line
	}, []);

	const noCaughtPokemon = (
		<div className='no-caught-pokemon'>
			You have no caught pokemon. Click on the{' '}
			<img
				src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
				alt='pokeball'
				className='pokeball-example'
			/>{' '}
			found on the Pokemon's pokedex card or its details page to add it to
			your list of caught pokemon.
		</div>
	);

	return (
		<Fragment>
			<PokedexNav />

			{pokemon && (
				<Container>
					<div className='pokedex'>
						{filter === 'caught' && caught.length === 0 ? (
							noCaughtPokemon
						) : searchTerm.length > 2 &&
						  searchResults.length === 0 ? (
							<div className='no-results'>
								Sorry, no results found for search '
								<strong>{searchTerm}</strong>
								.'
							</div>
						) : searchResults.length > 0 ? (
							mapResults(searchResults, filter, 898)
						) : filter === 'caught' && caught.length > 0 ? (
							mapResults(pokemon, filter, 898)
						) : (
							mapResults(pokemon, filter, limit)
						)}
					</div>

					<div className='load-more-wrapper'>
						{limit < 898 && filter !== 'caught' && (
							<Button
								className='load-more'
								onClick={() => {
									setLimit(limit + 20);
								}}>
								Load More
							</Button>
						)}
					</div>
				</Container>
			)}
		</Fragment>
	);
};

export default Pokedex;
