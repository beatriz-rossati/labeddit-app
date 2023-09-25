import {
    StyledPostContainer,
    StyledAuthorName,
    StyledContent,
    StyledContainer,
    StyledLikesAndCommentsSection,
    StyledButton,
    StyledDeletePost,
    StyledEditContent
} from './PostCardStyle';
import Likes from '../../assets/likes_icon.svg';
import Liked from '../../assets/liked_icon.png';
import Dislikes from '../../assets/dislikes_icon.svg';
import Disliked from '../../assets/disliked_icon.png';
import Comments from '../../assets/comments_icon.svg';
import Edit from '../../assets/edit_icon.png';
import Delete from '../../assets/delete_icon.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { BASE_URL, TOKEN } from '../../constants/BASE_URL';
import axios from 'axios';
import { goToFeedPage, goToPostPage } from '../../routes/coordinator';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
//TODO: Falta fazer esse global context e o "token"

export default function PostCard({ post }) {
	const { states, setters } = useContext(GlobalContext);

	const isCurrentUserPostCreator = states.userId === post.creator.id;
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [editing, setEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(post.content);
	const textareaRef = useRef(null);
	const [userLike, setUserLike] = useState(null);
	const navigate = useNavigate();

    //TODO: conferir o uso do useContext e o uso do token
	const checkLike = async () => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem(TOKEN),
			};
			const response = await axios.get(
				BASE_URL + '/posts/' + post.id + '/checklike',
				{
					headers,
				}
			);
			setUserLike(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkLike();
	}, [setters.handleLikeDislikePost]);

	const handleDeleteClick = (event) => {
		event.stopPropagation();
		setShowConfirmation(true);
	};

	const handleConfirmDelete = async (event) => {
		event.stopPropagation();
		await setters.handleDeletePost(post.id);
		goToFeedPage(navigate);
	};

	const handleCancelDelete = (event) => {
		event.stopPropagation();
		setShowConfirmation(false);
	};

	const handleEditClick = (event) => {
		setEditedContent(post.content)
		event.stopPropagation();
		setEditing(true);
	};

	const handleCancelEdit = (event) => {
		event.stopPropagation();
		setEditing(false);
		setEditedContent(post.content);
	};

	const handleSaveEdit = async (event) => {
		event.stopPropagation();
		await setters.handleEditPost(post.id, editedContent);
		setEditing(false);
	};

	const handleLikeDislike = async (event, like) => {
		event.stopPropagation();
		await setters.handleLikeDislikePost(post.id, like);
	};

	useEffect(() => {
		if (editing) {
			textareaRef.current.focus();
			textareaRef.current.setSelectionRange(
				editedContent.length,
				editedContent.length
			);
		}
	}, [editing]);

	const handleGoToComment = (event) => {
		event.stopPropagation();
		goToPostPage(navigate, post.id, states.userId);
	};

	return (
		<StyledPostContainer onClick={(event) => handleGoToComment(event)}>
			<StyledAuthorName>Enviado por: {post.creator.nick}</StyledAuthorName>
			{editing ? (
				<div>
					<StyledEditContent
						ref={textareaRef}
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
					/>
					<StyledLikesAndCommentsSection>
						<StyledButton onClick={(event) => handleSaveEdit(event)}>
							Salvar
						</StyledButton>
						<StyledButton onClick={(event) => handleCancelEdit(event)}>
							Cancelar
						</StyledButton>
					</StyledLikesAndCommentsSection>
				</div>
			) : (
				<StyledContent>{post.content}</StyledContent>
			)}
			<StyledLikesAndCommentsSection>
				<StyledContainer>
					<img
						src={userRated === 'like' ? Liked : Likes}
						alt="Like"
						onClick={(event) => handleLikeDislike(event, true)}
					/>
					{post.likes - post.dislikes}
					<img
						src={userRated === 'dislike' ? Disliked : Dislikes}
						alt="Dislike"
						onClick={(event) => handleLikeDislike(event, false)}
					/>
				</StyledContainer>
				<StyledContainer>
					<img src={Comments} alt="Comentários" />
					{post.comments}
				</StyledContainer>
				{isCurrentUserPostCreator && (
					<StyledButton onClick={(event) => handleEditClick(event)}>
						<img src={Edit} alt="Editar Post" />
					</StyledButton>
				)}
				{isCurrentUserPostCreator && (
					<StyledButton onClick={(event) => handleDeleteClick(event)}>
						<img src={Delete} alt="Deletar Post" />
					</StyledButton>
				)}
			</StyledLikesAndCommentsSection>
			{showConfirmation && (
				<StyledDeletePost>
					<p>Tem certeza que deseja excluir o post?</p>
					<StyledButton onClick={(event) => handleConfirmDelete(event)}>
						Sim
					</StyledButton>
					<StyledButton onClick={(event) => handleCancelDelete(event)}>
						Cancelar
					</StyledButton>
				</StyledDeletePost>
			)}
		</StyledPostContainer>
	);
}