import axiosMock from 'axios';

export const axData = () => {
	return axiosMock.get.mockImplementation((url) => {
		switch (url) {
			case 'https://pokeapi.co/api/v2/pokemon?limit=898':
				return Promise.resolve({
					data: {
						results: [
							{
								url: 'https://pokeapi.co/api/v2/pokemon/1',
								name: 'bulbasaur',
							},
						],
					},
				});
			case 'https://pokeapi.co/api/v2/pokemon/1':
				return Promise.resolve({
					data: {
						height: 7,
						id: 1,
						name: 'bulbasaur',
						order: 1,
						weight: 69,
						types: [
							{
								type: {
									name: 'grass',
								},
							},
							{
								type: {
									name: 'poison',
								},
							},
						],
						abilities: [
							{
								ability: {
									name: 'overgrow',
								},
							},
							{
								ability: {
									name: 'cholorphyll',
								},
							},
						],
						stats: [
							{
								base_stat: 45,
								stat: {
									name: 'hp',
								},
							},
							{
								base_stat: 49,
								stat: {
									name: 'attack',
								},
							},
						],
						sprites: {
							front_default:
								'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
							other: {
								'official-artwork': {
									front_default:
										'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
								},
							},
						},
					},
				});
			default:
				return Promise.reject(new Error('not found'));
		}
	});
};
