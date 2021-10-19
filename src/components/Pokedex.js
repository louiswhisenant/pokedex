import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Button } from 'reactstrap';

import axios from 'axios';
import Fuse from 'fuse.js';

import { PokemonContext } from '../PokemonContext';
import PokedexNav from './pokedex-nav/PokedexNav';
import Pokemon from './Pokemon';

const Pokedex = () => {
	const [data, setData] = useState({});
	const { appState, setAppState } = useContext(PokemonContext);
	const { caught, all, filter, searchResults, searchTerm } = appState;

	const loadMore = all.next && (
		<Button
			onClick={() => {
				getPokemon(all.next);
			}}>
			Load More
		</Button>
	);

	const cleanResults = searchResults.map((result) => {
		return result.item;
	});

	const mapResults = (req, filter) => {
		let res;

		switch (filter) {
			case 'caught':
				res = req.map(
					(result) =>
						caught.includes(result.name) && (
							<Pokemon pokemon={result} key={result.name} />
						)
				);
				break;

			case 'uncaught':
				res = req.map(
					(result) =>
						!caught.includes(result.name) && (
							<Pokemon pokemon={result} key={result.name} />
						)
				);
				break;

			case 'all':
			default:
				res = req.map((result) => (
					<Pokemon pokemon={result} key={result.name} />
				));
		}

		return res;
	};

	const getPokemon = async (req) => {
		const res = await axios.get(req);

		const { next, previous, results } = res.data;
		// TODO cleanup
		let newResults = [];
		data.results &&
			data.results.forEach((result) => newResults.push(result));
		results.forEach((result) => newResults.push(result));

		if (!data.results) {
			setData(res.data);
		} else {
			setData({
				...data,
				next,
				previous,
				results: newResults,
			});
		}
	};

	useEffect(() => {
		getPokemon('https://pokeapi.co/api/v2/pokemon');
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setAppState({ ...appState, all: data });
		// eslint-disable-next-line
	}, [data]);

	return (
		<Fragment>
			<PokedexNav />

			{all.results && (
				<Container>
					<div className='pokedex'>
						{searchTerm.length > 2 && cleanResults.length < 1 ? (
							<div className='no-results'>
								Sorry, no results found for search '
								<strong>{searchTerm}</strong>
								.'
							</div>
						) : cleanResults.length > 0 ? (
							mapResults(cleanResults, filter)
						) : (
							mapResults(all.results, filter)
						)}
						<Button className='load-more'>{loadMore}</Button>
					</div>
				</Container>
			)}
		</Fragment>
	);
};

export default Pokedex;
