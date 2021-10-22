import { useState, useContext, useEffect } from 'react';
import { NavItem, Form, Input } from 'reactstrap';
import { StoreContext } from '../../context/Context';
import Fuse from 'fuse.js';

const PokedexSearch = () => {
	const [query, setQuery] = useState('');
	const {
		// eslint-disable-next-line no-unused-vars
		pokemon: [pokemon, setPokemon],
		// eslint-disable-next-line no-unused-vars
		searchResults: [searchResults, setSearchResults],
		// eslint-disable-next-line no-unused-vars
		searchTerm: [searchTerm, setSearchTerm],
	} = useContext(StoreContext);

	const options = {
		// isCaseSensitive: false,
		// includeScore: false,
		shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		minMatchCharLength: 3,
		// location: 0,
		threshold: 0.3,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		keys: ['name'],
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (pokemon) {
			const fuse = new Fuse(pokemon, options);

			const res = fuse.search(query).map((obj) => obj.item);

			setSearchResults(res);
			setSearchTerm(query);
		}
		// eslint-disable-next-line
	}, [query, pokemon]);

	return (
		<NavItem id='pokedex-search'>
			<Form onSubmit={(e) => onSubmit(e)}>
				<Input
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
					}}
					placeholder='Search currently listed Pokemon'
				/>
			</Form>
		</NavItem>
	);
};

export default PokedexSearch;
