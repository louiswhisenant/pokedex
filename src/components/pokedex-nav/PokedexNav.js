import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import PokedexSearch from './PokedexSearch';
import PokedexFilter from './PokedexFilter';

const PokedexNav = () => {
	return (
		<Navbar color='light' light expand='xs' id='pokedex-nav'>
			<NavbarBrand href='/'>Pokedex</NavbarBrand>
			<Nav className='mr-auto' navbar>
				<PokedexSearch />
				<PokedexFilter />
			</Nav>
		</Navbar>
	);
};

export default PokedexNav;
