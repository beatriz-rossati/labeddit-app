import Logo from '../../assets/large_logo.svg';
import {
	StyledButtonContainer,
	StyledErrorMessage,
	StyledForm,
	StyledInputContainer,
	StyledDivisonLine,
	StyledLoginButton,
	StyledMainContainer,
	StyledTitle,
	StyledSignUpButton,
	StyledSubTitle,
	StyledTitleContainer,
} from './LoginPageStyle';
import Input from '../../components/input/Input';
import { useNavigate } from 'react-router-dom';
import { goToSignupPage, goToFeedPage } from '../../routes/coordinator';
import { useState, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/BASE_URL';
import { GlobalContext } from '../../context/GlobalContext';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [erro, setErro] = useState('');
	const navigate = useNavigate();
	const { states } = useContext(GlobalContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const body = {
				email: email,
				password: password,
			};

			const response = await axios.post(`${BASE_URL}/users/login`, body);
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("userId", response.data.userId);
			states.setUserId(response.data.userId)

			goToFeedPage(navigate);
		} catch (error) {
			setErro(error.response.data);
		}
	};

	const handleSignUpClick = () => {
		goToSignupPage(navigate);
	};
//TODO: o error message só está mostrando um erro ( na vdd está lento)
	return (
		<>
			<StyledMainContainer>
				<StyledTitleContainer>
					<img width={'84px'} src={Logo} alt="" />
					<StyledTitle>LabEddit</StyledTitle>
					<StyledSubTitle>O projeto de rede social da Labenu</StyledSubTitle>
				</StyledTitleContainer>
				<StyledForm onSubmit={handleSubmit}>
					<StyledErrorMessage>{erro}</StyledErrorMessage>
					<StyledInputContainer>
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
					</StyledInputContainer>
					<StyledButtonContainer>
						<StyledLoginButton type="submit" value="Continuar" />
						<StyledDivisonLine />
						<StyledSignUpButton onClick={handleSignUpClick}>
							Crie uma conta!
						</StyledSignUpButton>
					</StyledButtonContainer>
				</StyledForm>
			</StyledMainContainer>
		</>
	);
}