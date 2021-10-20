import { useState } from 'react';
import { StoreContext } from './Context';

export const StoreProvider = ({ children }) => {
	const [caught, setCaught] = useState([]);
	const [pokemon, setPokemon] = useState([]);
	const [filter, setFilter] = useState('all');
	const [searchResults, setSearchResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const store = {
		caught: [caught, setCaught],
		pokemon: [pokemon, setPokemon],
		filter: [filter, setFilter],
		searchResults: [searchResults, setSearchResults],
		searchTerm: [searchTerm, setSearchTerm],
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};
