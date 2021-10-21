import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import { act } from 'react-dom/test-utils';

import { StoreProvider } from '../context/Store';

import App from '../App';
import Pokedex from '../components/Pokedex';

import { axData } from './axData';

jest.mock('axios');

test('fetch and render of Pokemon on homepage', async () => {
	axData();

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
