import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonToggle from './PokemonToggle';
import {
	formatNumber,
	formatHeight,
	formatWeight,
} from '../utils/formatNumbers';
import { Spinner, Button, Container } from 'reactstrap';

const PokemonDetails = ({ match }) => {
	const [details, setDetails] = useState(null);

	const getDetails = async () => {
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${match.params.id}`
		);

		setDetails(res.data);
	};

	useEffect(() => {
		getDetails();
		// eslint-disable-next-line
	}, []);

	if (!details) {
		return <div>Loading...</div>;
	}

	const { sprites, name, order, types, stats, abilities, height, weight } =
		details;

	const avatar =
		sprites.other['official-artwork'].front_default ??
		sprites.front_default;

	if (!details) {
		return <Spinner />;
	}

	return (
		<section className='pokemon-details'>
			<div className='links'>
				<Link to='/'>
					<Button>
						<i className='fas fa-arrow-left'></i>{' '}
						<span className='d-none d-md-inline'>
							Back to Pokedex
						</span>
					</Button>
				</Link>
			</div>

			<PokemonToggle name={name} />

			<div className='pokemon-details-header'>
				<h1 className='title'>{name}</h1>
				<h1>#{formatNumber(order, 3)}</h1>
			</div>
			<Container>
				<div className='pokemon-details-body'>
					<div className='pokemon-details-image'>
						<img src={avatar} alt={name} />
					</div>

					<div className='pokemon-details-info'>
						<div className='types'>
							<div className='pokemon-details-title types-title'>
								Types
							</div>
							<div className='types-body'>
								{types.map((t) => (
									<p
										className={`type type-${t.type.name}`}
										key={t.type.name}>
										{t.type.name}
									</p>
								))}
							</div>
						</div>

						<div className='abilities'>
							<div className='pokemon-details-title abilities-title'>
								Abilities
							</div>
							<div className='abilities-body'>
								{abilities.map((a) => (
									<div
										className={`ability ability-${a.ability.name}`}
										key={a.ability.name}>
										{a.ability.name}
									</div>
								))}
							</div>
						</div>

						<div className='biometrics'>
							<div className='pokemon-details-title biometrics-title'>
								Biometrics
							</div>
							<div className='biometrics-body'>
								<p className='biometric'>
									<i className='fas fa-ruler'></i>{' '}
									<span>{formatHeight(height)}</span>
								</p>
								<p className='biometric'>
									<i className='fas fa-weight-hanging'></i>{' '}
									<span>{formatWeight(weight)}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='pokemon-details-footer'>
					<div className='stats'>
						<div className='pokemon-details-title stats-title'>
							Stats
						</div>
						<div className='stats-body'>
							{stats.map((s) => (
								<div
									className={`stat stat-${s.stat.name}`}
									key={s.stat.name}>
									<div className='stat-name'>
										{s.stat.name}
									</div>
									<span className='stat-value'>
										{s.base_stat}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default PokemonDetails;
