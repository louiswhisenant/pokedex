import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import axiosMock from 'axios';

import { StoreProvider } from '../context/Store';

import App from '../App';
import PokemonDetails from '../components/PokemonDetails';

import { axData } from './axData';

jest.mock('axios');

test('fetch and render of Pokemon on details page', async () => {
	axData();

	await act(async () => {
		render(
			<StoreProvider>
				<App>
					<PokemonDetails
						match={{
							params: { id: 1 },
							isExact: true,
							path: '',
							url: '',
						}}
					/>
				</App>
			</StoreProvider>
		);
	});

	expect(axiosMock.get).toHaveBeenCalled();
	expect(axiosMock.get).toHaveBeenCalledWith(
		'https://pokeapi.co/api/v2/pokemon/1'
	);
	expect(axiosMock.get).toHaveReturned();
	expect(screen.getByText('bulbasaur')).toBeVisible();
});
