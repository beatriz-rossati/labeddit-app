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

export const StyledLogoutButton = styled.a`
	color: #4088cb;
	cursor: pointer;
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 600;
`;

export const StyledMainContainer = styled.main`
	display: flex;
	flex-direction: column;
	padding: 32px;

	@media screen and (min-width: 768px) {
		margin: 0 auto;
		width: 55%;
	}
`;

export const StyledWritingSection = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 12px;
`;

export const StyledTextArea = styled.textarea`
	color: #6f6f6f;
	background-color: #ededed;
	border: none;
	border-radius: 12px;
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 400;
	height: 130px;
	line-height: normal;
	padding: 17px;
	resize: none;

	&:focus {
		outline: none;
		border: 1px solid #6f6f6f;
	}
`;

export const StyledCreatePostButton = styled.button`
	background: linear-gradient(90deg, var(--gradientBegin), var(--gradientEnd));
	color: #fff;
	cursor: pointer;
	border: none;
	border-radius: 12px;
	height: 50px;
	font-family: 'Noto Sans', sans-serif;
	font-size: 1.125rem;
	font-weight: 700;
	transition: 0.25s all;

	&:hover {
		box-shadow: var(--gradientBegin) 0px 2px 16px 0px;
	}

	@media screen and (min-width: 768px) {
		font-size: 0.9rem;
	}
`;

export const StyledDivisonLine = styled.hr`
	background: linear-gradient(90deg, var(--gradientBegin), var(--gradientEnd));
	border: none;
	height: 1px;
	margin: 32px 0 26px 0;
`

export const StyledPostList = styled.ul`
	display: flex;
	flex-direction: column;
	row-gap: 10px;
`