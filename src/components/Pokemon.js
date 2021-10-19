import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../utils/formatNumbers';
import PokemonToggle from './PokemonToggle';

const Pokemon = ({ pokemon: { name, url } }) => {
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		async function fetchData(url) {
			const res = await axios.get(url);

			setPokemon(res.data);
		}

		url && fetchData(url);
	}, [url]);

	return (
		pokemon && (
			<div className='pokemon' id={`pokemon-${pokemon.order}`}>
				<PokemonToggle name={name} />
				{pokemon && (
					<Link to={`/pokemon/${name}`}>
						<img src={pokemon.sprites.front_default} alt={name} />
					</Link>
				)}
				<div className='info'>
					<h3>{name}</h3>
					{pokemon && <h4>#{formatNumber(pokemon.order, 3)}</h4>}
				</div>
				<div className='types d-none d-md-block'>
					{pokemon.types.map((t) => (
						<div className={`type type-${t.type.name}`}>
							{t.type.name}
						</div>
					))}
				</div>
				<div></div>
				<div className='divider'>
					<div className='divider-center'></div>
				</div>
			</div>
		)
	);
};

export default Pokemon;
