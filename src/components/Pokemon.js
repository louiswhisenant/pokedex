import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../utils/formatNumbers';
import PokemonToggle from './PokemonToggle';
import { StoreContext } from '../context/Context';

const Pokemon = ({ pokemon: { name, url } }) => {
	const [pokemon, setPokemon] = useState(null);
	const {
		caught: [caught],
	} = useContext(StoreContext);

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
				<Link to={`/pokemon/${name}`}>
					<div
						className={`pokemon-upper ${
							caught.includes(pokemon.name) &&
							'pokemon-upper-caught'
						}`}>
						{pokemon && (
							<img
								className='pokemon-image'
								src={pokemon.sprites.front_default}
								alt={name}
							/>
						)}

						<div className='pokemon-info'>
							<h3 className='info-name'>{name}</h3>
							{pokemon && (
								<h4 className='info-order'>
									#{formatNumber(pokemon.id, 3)}
								</h4>
							)}
						</div>
					</div>

					<div className='pokemon-lower'>
						<div className='types'>
							{pokemon.types.map((t) => (
								<div
									className={`type type-${t.type.name}`}
									key={t.type.name}>
									{t.type.name}
								</div>
							))}
						</div>

						<div className='divider'>
							<div className='divider-center'></div>
						</div>
					</div>
				</Link>
			</div>
		)
	);
};

export default Pokemon;
