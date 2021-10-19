import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonToggle from './PokemonToggle';
import {
	formatNumber,
	formatHeight,
	formatWeight,
} from '../utils/formatNumbers';
import { Spinner, Button } from 'reactstrap';

const PokemonDetails = ({ match, url }) => {
	const [details, setDetails] = useState(null);

	const getDetails = async (url) => {
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${match.params.id}`
		);

		setDetails(res.data);
	};

	useEffect(() => {
		getDetails(url);
		// eslint-disable-next-line
	}, [url]);

	if (!details) {
		return <div>Loading...</div>;
	}

	const { sprites, name, order, types, height, weight } = details;

	const avatar =
		sprites.other['official-artwork'].front_default ??
		sprites.front_default;

	if (!details) {
		return <Spinner />;
	}

	return (
		<div className='pokemon-details'>
			<div className='links'>
				<Link to='/'>
					<Button>
						<i className='fas fa-arrow-left'></i>
					</Button>
				</Link>
			</div>
			<div className='pokemon-details-header'>
				<h1 className='title'>{name}</h1>
				<h1>#{formatNumber(order, 3)}</h1>
			</div>
			<div className='pokemon-details-body'>
				<div className='pokemon-details-image'>
					<img src={avatar} alt={name} />
				</div>
				<div className='pokemon-details-info'>
					<PokemonToggle name={name} />
					<div className='types'>
						{types.map((t) => (
							<p
								className={`type type-${t.type.name}`}
								key={t.type.name}>
								{t.type.name}
							</p>
						))}
					</div>
					<div className='biometrics'>
						<h3>
							<i className='fas fa-weight-hanging'></i>{' '}
							{formatHeight(height)}
						</h3>
						<h3>
							<i className='fas fa-ruler'></i>{' '}
							{formatWeight(weight)}
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetails;
