export const addComma = (number: number) => {
	return new Intl.NumberFormat().format(number);
};
