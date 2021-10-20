import { useState, useContext, useEffect } from 'react';
import { NavItem, Form, Input } from 'reactstrap';
import { StoreContext } from '../../context/Context';
import Fuse from 'fuse.js';

const PokedexSearch = () => {
	const [query, setQuery] = useState('');
	const {
		pokemon: [pokemon, setPokemon],
		pokemon: [filter, setFilter],
		searchResults: [searchResults, setSearchResults],
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

	useEffect(() => {
		if (pokemon) {
			const fuse = new Fuse(pokemon, options);

			const res = fuse.search(query).map((obj) => obj.item);

			setSearchResults(res);
			setSearchTerm(query);
		}
	}, [query, pokemon]);

	return (
		<NavItem id='pokedex-search'>
			<Form>
				<Input
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
					}}
					placeholder='Search currently listed Pokemon'
				/>
				{filter !== 'all' && (
					<div className='active-filter'>
						<i className='fas fa-exclamation'></i>{' '}
						<span>filter active</span>
					</div>
				)}
			</Form>
		</NavItem>
	);
};

export default PokedexSearch;
