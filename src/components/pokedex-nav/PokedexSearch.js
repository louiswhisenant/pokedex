import { useState, useContext, useEffect } from 'react';
import { NavItem, Form, Input } from 'reactstrap';
import { PokemonContext } from '../../PokemonContext';

import Fuse from 'fuse.js';

const PokedexSearch = () => {
	const [query, setQuery] = useState('');
	const { appState, setAppState } = useContext(PokemonContext);
	const { all, filter, searchTerm } = appState;

	const options = {
		// isCaseSensitive: false,
		// includeScore: false,
		shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		minMatchCharLength: 3,
		// location: 0,
		// threshold: 0.6,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		keys: ['name'],
	};

	useEffect(() => {
		if (all.results) {
			const fuse = new Fuse(all.results, options);

			setAppState({
				...appState,
				searchResults: fuse.search(query),
				searchTerm: query,
			});
		}
	}, [query, all.results]);

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
