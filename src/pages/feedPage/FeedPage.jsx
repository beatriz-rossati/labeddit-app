//import useProtectedPage from '../../hooks/protectedPage';
import {
	StyledHeader,
	StyledDivisonLine,
	StyledLogo,
	StyledLogoutButton,
	StyledMainContainer,
	StyledTextArea,
	StyledCreatePostButton,
	StyledPostList,
	StyledWritingSection,
} from './FeedPageStyle';
import LogoImg from '../../assets/small_logo.svg';
import { goToLoginPage } from '../../routes/coordinator';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/BASE_URL';
import PostCard from "../../components/postCard/PostCard"
import { GlobalContext } from '../../context/GlobalContext';

export default function FeedPage() {
	const navigate = useNavigate();
	const [postContent, setPostContent] = useState('');
	const { states, methods } = useContext(GlobalContext);

	// useProtectedPage();

	const handlePostContentChange = (e) => {
		setPostContent(e.target.value);
	};

	const handleLogoutClick = () => {
		window.localStorage.removeItem('token');
		goToLoginPage(navigate);
	};

	const createNewPost = async () => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem('token'),
			};
			const body = {
				content: postContent,
			};
			await axios.post(BASE_URL + '/posts/', body, { headers });
			setPostContent('');

			methods.getPosts();

		} catch (error) {
            setErro(error.response.data);
			console.log(error);
		}
	};

	useEffect(() => {
		methods.getPosts();
	}, []);

	return (
		<>
			<StyledHeader>
				<StyledLogo src={LogoImg} alt="" width={'28px'} />
				<StyledLogoutButton onClick={handleLogoutClick}>Logout</StyledLogoutButton>
			</StyledHeader>
			<StyledMainContainer>
				<StyledWritingSection>
					<StyledTextArea
						value={postContent}
						onChange={handlePostContentChange}
						placeholder="Escreva seu post..."
					/>
					<StyledCreatePostButton onClick={createNewPost}>
						Postar
					</StyledCreatePostButton>
				</StyledWritingSection>
				<StyledDivisonLine />
				<StyledPostList>
					{states.posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</StyledPostList>
			</StyledMainContainer>
		</>
	);
}
