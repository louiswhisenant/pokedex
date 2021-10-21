import { useContext, useEffect } from 'react';
import { StoreContext } from '../context/Context';

const PokemonToggle = ({ name }) => {
	const {
		caught: [caught, setCaught],
	} = useContext(StoreContext);

	const onToggle = () => {
		caught.includes(name)
			? setCaught(caught.filter((pokemon) => pokemon !== name))
			: setCaught([...caught, name]);
	};

	useEffect(() => {
		localStorage.setItem('caughtPokemon', JSON.stringify(caught));
	}, [caught]);

	return (
		<button className='pokemon-toggle caught-checkbox' onClick={onToggle}>
			{caught.includes(name) ? (
				<img
					src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
					alt='pokeball'
					className='pokeball-caught'
				/>
			) : (
				<img
					src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
					alt='pokeball uncaught'
					className='pokeball-uncaught'
				/>
			)}
		</button>
	);
};

export default PokemonToggle;
