import styled from 'styled-components';

export const StyledMainContainer = styled.main`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-around;
	width: 100%;
	

	@media screen and (min-width: 768px) {
		justify-content: center;
		margin: 0 auto;
		width: 50%;
	}

	@media screen and (min-width: 1024px) {
		width: 40%;
	}
`;

export const StyledTitleContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	font-family: 'IBM Plex Sans', sans-serif;
	row-gap: 11px;
`;

export const StyledTitle = styled.h1`
	color: #373737;
	font-size: 2.25rem;
	font-weight: 700;
	
`;

export const StyledSubTitle = styled.h2`
	font-size: 1rem;
	font-weight: 400;
`;

export const StyledForm = styled.form`
	align-items: center;
	display: flex;
	row-gap: 56px;
	flex-direction: column;
	padding: 0 32px;

	@media screen and (min-width: 768px) {
		row-gap: 28px;
	}
`;

export const StyledInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 8px;
	width: 100%;
`;

export const StyledButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 18px;
	width: 100%;
`;

export const StyledLoginButton = styled.input`
	background: linear-gradient(90deg, var(--gradientBegin), var(--gradientEnd));
	color: #fff;
	cursor: pointer;
	border: none;
	border-radius: 27px;
	height: 50px;
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 700;
	transition: 0.25s all;

	&:hover {
		box-shadow: var(--gradientEnd) 0px 2px 4px 0px;
		transform: translateY(-0.15em);
	}

	@media screen and (min-width: 768px) {
		font-size: 0.9rem;
	}
`;

export const StyledDivisonLine = styled.hr`
	background: linear-gradient(90deg, var(--gradientBegin), var(--gradientEnd));
	border: none;
	height: 1px;
	margin: 0;
`;

export const StyledSignUpButton = styled.button`
	background-color: #fff;
	color: var(--orange);
	cursor: pointer;
	border: 1px solid var(--orange);
	border-radius: 27px;
	height: 50px;
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 700;
	transition: 0.25s all;

	&:hover {
		box-shadow: var(--gradientEnd) 0px 2px 0px 0px;
		transform: translateY(-0.15em);
	}

	@media screen and (min-width: 768px) {
		font-size: 0.9rem;
	}
`;

export const StyledErrorMessage = styled.span`
	color: var(--gradientBegin);
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 700;
	text-align: center;
`;