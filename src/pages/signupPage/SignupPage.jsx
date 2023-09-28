import {
	StyledHeader,
	StyledLogo,
	StyledGoToLoginButton,
	StyledMainContainer,
	StyledTitle,
	StyledForm,
	StyledInputContainer,
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
import { useState, useContext } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';

export default function SignUpPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [erro, setErro] = useState(''); 
	const { states } = useContext(GlobalContext);


	const navigate = useNavigate();

	const handleLoginClick = () => {
		goToLoginPage(navigate);
	};


	const handleSubmit = async (e) => {
		e.preventDefault();

		// TODO: criar loader do botao, quando clicar setar o loader pra true, e não deixar clicar se estiver loading

		try {
			const body = {
				name,
				email,
				password,
			};

			const response = await axios.post(`${BASE_URL}/users/signup`, body);
			window.localStorage.setItem("token", response.data.token);
			localStorage.setItem("userId", response.data.userId);
			states.setUserId(response.data.userId)

			if (response.status == 201) {
				goToFeedPage(navigate);
			}


		} catch (error) {
			console.log(error);
			if (error.response.status == 400){
				setErro('Informações invalidas');
			} else if (error.response.status == 409){
				setErro('Email já cadastrado');
			}
		}
	};
	// TODO validar inputs
	// useEffect (() => {
	// 	if (
	// 		//regex aqui)
	// 	) {
	// 		//ok
	// 	} else {
	// 		//set error, senha invalida
	// 	}
	// }, [password])

	return (
		<>
			<StyledHeader>
				<StyledLogo src={LogoImg} alt="" width={'28px'} />
				<StyledGoToLoginButton onClick={handleLoginClick}>Entrar</StyledGoToLoginButton>
			</StyledHeader>
			<StyledMainContainer>
				<StyledTitle>Olá, bem-vindo ao LabEddit ;)</StyledTitle>
				<StyledForm onSubmit={handleSubmit}>
					<StyledError>{erro}</StyledError>
					<StyledInputContainer>
						<Input
							placeHolder="Nome"
							type="text"
							value={name}
							setValue={setName}
							required
						/>
						<Input
							placeHolder="E-mail"
							type="email"
							value={email}
							setValue={setEmail}
							required
						/>
						<Input
							placeHolder="Senha"
							type="password"
							value={password}
							setValue={setPassword}
							required
						/>
					</StyledInputContainer>
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
						<StyledSignUpButton>Cadastrar</StyledSignUpButton>
					</StyledAgreementContainer>
				</StyledForm>
			</StyledMainContainer>
		</>
	);
}//Todo: não entendi o {' '} da linha 89 e 90. Testar o checkbox, os botões e a mensagem de erro.