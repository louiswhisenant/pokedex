import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pokedex from '../components/Pokedex';
import { StoreProvider } from '../context/Store';
import App from '../App';
import axiosMock from 'axios';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

test('fetch and render of Pokemon on homepage', async () => {
	axiosMock.get.mockResolvedValue({
		data: {
			results: [
				{
					url: 'https://pokeapi.co/api/v2/pokemon/1',
					name: 'bulbasaur',
				},
			],
		},
	});

	axiosMock.get.mockImplementation((url) => {
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

	await act(async () => {
		render(
			<StoreProvider>
				<App>
					<Pokedex />
				</App>
			</StoreProvider>
		);
	});

	expect(axiosMock.get).toHaveBeenCalled();
	expect(axiosMock.get).toHaveBeenCalledWith(
		'https://pokeapi.co/api/v2/pokemon?limit=898'
	);
	expect(axiosMock.get).toHaveReturned();
	expect(screen.getByText('bulbasaur')).toBeVisible();
});
