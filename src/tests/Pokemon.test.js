import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pokemon from '../components/Pokemon';
import { StoreProvider } from '../context/Store';
// import App from '../App';
import axiosMock from 'axios';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { axData } from './axData';

jest.mock('axios');

describe('<Pokemon />', () => {
	it('fetches and renders Pokemon', async () => {
		axData();

		await act(async () => {
			render(
				<StoreProvider>
					<BrowserRouter>
						<Pokemon
							pokemon={{
								name: 'bulbasaur',
								url: 'https://pokeapi.co/api/v2/pokemon/1',
							}}
						/>
					</BrowserRouter>
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
});
