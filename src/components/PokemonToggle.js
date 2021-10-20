import { useContext, useEffect } from 'react';
import { PokemonContext } from '../PokemonContext';

const PokemonToggle = ({ name }) => {
	const { appState, setAppState } = useContext(PokemonContext);
	const { caught } = appState;

	const onToggle = async () => {
		if (caught.includes(name)) {
			await setAppState({
				...appState,
				caught: caught.filter((pokemon) => pokemon !== name),
			});

			console.log(caught);
		} else {
			await setAppState({ ...appState, caught: [...caught, name] });

			console.log(caught);
		}

		// localStorage.setItem('caughtPokemon', JSON.stringify(caught));
	};

	useEffect(() => {
		localStorage.setItem('caughtPokemon', JSON.stringify(caught));
		console.log(caught);
	}, [caught]);

	return (
		<div className='caught-checkbox' onClick={onToggle}>
			{caught.includes(name) ? (
				<img
					src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
					alt='pokeball'
				/>
			) : (
				<img
					src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
					alt='pokeball uncaught'
					className='uncaught'
				/>
			)}
		</div>
	);
};

export default PokemonToggle;
