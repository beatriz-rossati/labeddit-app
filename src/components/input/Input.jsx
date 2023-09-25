import { useState } from 'react';
import { StyledContainer, StyledInputField, StyledLabel } from './InputStyle';

export default function Input({ placeHolder, type, value, setValue }) {

	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<StyledContainer>
			<StyledInputField
				type={type}
				value={value}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
				required
			/>
			<StyledLabel shrink={isFocused || value}>{placeHolder}</StyledLabel>
		</StyledContainer>
	);
}