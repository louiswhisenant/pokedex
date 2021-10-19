export const formatNumber = (value, padding) => {
	var zeroes = new Array(padding + 1).join('0');
	return (zeroes + value).slice(-padding);
};

export const formatWeight = (hectograms) => {
	return `${hectograms / 10}kg`;
};

export const formatHeight = (decimetres) => {
	return `${decimetres / 10}m`;
};
