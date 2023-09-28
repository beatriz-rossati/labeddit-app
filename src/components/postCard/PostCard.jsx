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
import Upvote from '../../assets/upvote_icon.svg';
import Upvoted from '../../assets/upvoted_icon.png';
import Downvote from '../../assets/downvote_icon.svg';
import Downvoted from '../../assets/downvoted_icon.png';
import Comments from '../../assets/comments_icon.svg';
import Edit from '../../assets/edit_icon.png';
import Delete from '../../assets/delete_icon.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';
import axios from 'axios';
import { goToFeedPage, goToPostPage } from '../../routes/coordinator';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

//TODO: Falta fazer esse global context e o "token"

export default function PostCard({ post }) {
	const { states, methods } = useContext(GlobalContext);

	const isCurrentUserPostCreator = localStorage.getItem("userId") === post.creator.id;
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [editing, setEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(post.content);
	const textareaRef = useRef(null);
	const [userRating, setUserRating] = useState(null);
	const navigate = useNavigate();

//TODO: colocar na informação do post se ele foi curtido pelo usuário atual

	const handleDeleteClick = (event) => {
		event.stopPropagation();
		setShowConfirmation(true);
	};

	const handleConfirmDelete = async (event) => {
		event.stopPropagation();
		await methods.handleDeletePost(post.id);
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
		await methods.handleEditPost(post.id, editedContent);
		setEditing(false);
	};

	const handleRating = async (event, like) => {
		event.stopPropagation();
		await methods.handleRatingPost(post.id, like);
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
						src={userRating === 'like' ? Upvoted : Upvote}
						alt="Like"
						onClick={(event) => handleRating(event, true)}
					/>
					{post.likes - post.dislikes}
					<img
						src={userRating === 'dislike' ? Downvoted : Downvote}
						alt="Dislike"
						onClick={(event) => handleRating(event, false)}
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