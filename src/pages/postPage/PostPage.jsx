//import useProtectedPage from '../../hooks/protectedPage';
import {
	Header,
	Line,
	Logo,
	Logout,
	Main,
	NewPost,
	NewPostButton,
	PostList,
	WritePost,
} from './PostPageStyle';
import LogoImg from '../../assets/small_logo.svg';
import { goToLoginPage } from '../../routes/coordinator';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/BASE_URL';
import PostCard from "../../components/postCard/PostCard"
import { GlobalContext } from '../../context/GlobalContext';

export default function PostsPage() {
	const navigate = useNavigate();
	const [postContent, setPostContent] = useState('');
	const { states, setters } = useContext(GlobalContext);

	// useProtectedPage();

	const handlePostContentChange = (e) => {
		setPostContent(e.target.value);
	};

	const handleLogoutClick = () => {
		window.localStorage.removeItem(TOKEN);
		goToLoginPage(navigate);
	};

	const createNewPost = async () => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const body = {
				content: postContent,
			};
			await axios.post(BASE_URL + '/posts/', body, { headers });
			setPostContent('');
			setters.fetchPosts();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setters.fetchPosts();
	}, [states.posts]);

	return (
		<>
			<Header>
				<Logo src={LogoImg} alt="" width={'28px'} />
				<Logout onClick={handleLogoutClick}>Logout</Logout>
			</Header>
			<Main>
				<WritePost>
					<NewPost
						value={postContent}
						onChange={handlePostContentChange}
						placeholder="Escreva seu post..."
					/>
					<NewPostButton onClick={createNewPost}>
						Postar
					</NewPostButton>
				</WritePost>
				<Line />
				<PostList>
					{states.posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</PostList>
			</Main>
		</>
	);
}
