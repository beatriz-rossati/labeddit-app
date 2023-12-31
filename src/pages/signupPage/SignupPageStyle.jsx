import styled from 'styled-components';

export const StyledHeader = styled.header`
	align-items: center;
	background-color: #ededed;
	display: flex;
	height: 50px;
	padding: 0 30px;
	justify-content: flex-end;
`;

export const StyledLogo = styled.img`
	margin: 0 auto;
	width: 28px;
`;

export const StyledGoToLoginButton = styled.a`
	color: #4088cb;
	cursor: pointer;
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 600;
`;

export const StyledMainContainer = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 32px;
	height: calc(100% - 64px - 50px);

	@media screen and (min-width: 768px) {
		justify-content: space-around;
		margin: 0 auto;
		width: 50%;
	}

	@media screen and (min-width: 1024px) {
		width: 40%;
	}
`;

export const StyledTitle = styled.h1`
	color: #373737;
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 2rem;
	font-weight: 700;
	line-height: normal;
`;

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	row-gap: 65px;

	@media screen and (min-width: 768px) {
		row-gap: 16px;
	}
`;

export const StyledInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 8px;
	width: 100%;
`;

export const StyledAgreementContainer = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 17px;
`

export const StyledText = styled.p`
	font-family: 'Noto Sans', sans-serif;
	font-size: 0.875rem;
	font-weight: 400;
	line-height: normal;
`

export const StyledSpan = styled.span`
	color: #4088CB;
	font-weight: 500;
`

export const StyledSignUpButton = styled.button`
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

export const StyledSubscriptionContainer = styled.div`
	column-gap: 11px;
	display: flex;
`

export const StyledError = styled.span`
	color: var(--gradientBegin);
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 700;
	text-align: center;
`;