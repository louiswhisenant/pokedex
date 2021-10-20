import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pokedex from '../components/Pokedex';
import { StoreProvider } from '../context/Store';
import App from '../App';

test('renders Pokemon', () => {
	render(
		<StoreProvider>
			<App>
				<Pokedex />
			</App>
		</StoreProvider>
	);
	expect(screen.getByText('bulbasaur')).toBeVisible();
});
