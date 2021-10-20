import { useContext } from 'react';
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { StoreContext } from '../../context/Context';

const PokedexFilter = () => {
	const {
		filter: [filter, setFilter],
	} = useContext(StoreContext);

	const onChange = (e) => {
		setFilter(e.target.value);
	};

	return (
		<UncontrolledDropdown inNavbar id='pokedex-filter'>
			<DropdownToggle caret>
				<i className='fas fa-filter'></i>
			</DropdownToggle>
			<DropdownMenu right>
				<DropdownItem onClick={onChange} value='all'>
					All
				</DropdownItem>
				<DropdownItem onClick={onChange} value='caught'>
					Caught
				</DropdownItem>
				<DropdownItem onClick={onChange} value='uncaught'>
					Uncaught
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	);
};

export default PokedexFilter;
