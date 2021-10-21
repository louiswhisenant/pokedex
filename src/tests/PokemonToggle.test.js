import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';

import { StoreProvider } from '../context/Store';
import { BrowserRouter } from 'react-router-dom';
import PokemonToggle from '../components/PokemonToggle';

import { axData } from './axData';

jest.mock('axios');

describe('<PokemonToggle />', () => {
	it('renders PokemonToggle component', async () => {
		axData();

		await act(async () => {
			render(
				<StoreProvider>
					<BrowserRouter>
						<PokemonToggle name='bulbasaur' />
					</BrowserRouter>
				</StoreProvider>
			);
		});

		expect(screen.getByAltText('pokeball uncaught')).toBeVisible();
	});

	it('tests click event on component', async () => {
		const mockCallBack = jest.fn();
		axData();

		const wrapper = shallow(
			<StoreProvider>
				<BrowserRouter>
					<PokemonToggle name='bulbasaur' onClick={mockCallBack} />
				</BrowserRouter>
			</StoreProvider>
		);
		wrapper.find(PokemonToggle).simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	});
});
