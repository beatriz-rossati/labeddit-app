import {
	StyledHeader,
	StyledLogo,
	StyledGoToLoginButton,
	StyledMainContainer,
	StyledTitle,
	StyledForm,
	StyledButtonsContainer,
	StyledAgreementContainer,
	StyledText,
	StyledSignUpButton,
	StyledSpan,
	StyledSubscriptionContainer,
	StyledError,
} from './SignupPageStyle';
import LogoImg from '../../assets/small_logo.svg';
import { useNavigate } from 'react-router-dom';
import { goToLoginPage, goToFeedPage } from '../../routes/coordinator';
import Input from '../../components/input/Input';
import { useState } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';
import axios from 'axios';

export default function SignUpPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [erro, setErro] = useState(''); 

	const navigate = useNavigate();

	const handleLoginClick = () => {
		goToLoginPage(navigate);
	};


	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const body = {
				name,
				email,
				password,
			};

			const response = await axios.post(`${BASE_URL}/users/signup`, body);
			window.localStorage.setItem("token", response.data.token);

			goToFeedPage(navigate);

		} catch (error) {
			setErro(error.response.data);
		}
	};

	return (
		<>
			<StyledHeader>
				<StyledLogo src={LogoImg} alt="" width={'28px'} />
				<StyledGoToLoginButton onClick={handleLoginClick}>Entrar</StyledGoToLoginButton>
			</StyledHeader>
			<StyledMainContainer>
				<StyledTitle>Olá, bem-vindo ao LabEddit ;)</StyledTitle>
				<StyledError>{erro}</StyledError>
				<StyledForm onSubmit={handleSubmit}>
					<StyledButtonsContainer>
						<Input
							placeHolder="Nome"
							type="text"
							value={name}
							setValue={setName}
						/>
						<Input
							placeHolder="E-mail"
							type="email"
							value={email}
							setValue={setEmail}
						/>
						<Input
							placeHolder="Senha"
							type="password"
							value={password}
							setValue={setPassword}
						/>
					</StyledButtonsContainer>
					<StyledAgreementContainer>
						<StyledText>
							Ao continuar, você concorda com o nosso{' '}
							<StyledSpan>Contrato de usuário</StyledSpan> e nossa{' '}
							<StyledSpan>Política de Privacidade</StyledSpan>
						</StyledText>
						<StyledSubscriptionContainer>
							<input type="checkbox" />
							<StyledText>
								Eu concordo em receber emails sobre coisas
								legais no Labeddit
							</StyledText>
						</StyledSubscriptionContainer>
						<StyledSignUpButton onClick={handleSubmit}>Cadastrar</StyledSignUpButton>
					</StyledAgreementContainer>
				</StyledForm>
			</StyledMainContainer>
		</>
	);
}//Todo: não entendi o {' '} da linha 89 e 90. Testar o checkbox, os botões e a mensagem de erro.