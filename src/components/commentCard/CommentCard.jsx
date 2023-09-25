import { useContext, useEffect, useRef, useState } from 'react';
import {
	StyledAuthorName,
    StyledButton,
	StyledContent,
    StyledContainer,
    StyledRatingSection,
	StyledRatingContainer,
    StyledDeleteContainer,
    StyledEditContentArea
} from './commentCardStyle';
import { GlobalContext } from '../../context/GlobalContext';
import Likes from '../../assets/likes_icon.svg';
import Liked from '../../assets/liked_icon.png';
import Dislikes from '../../assets/dislikes_icon.svg';
import Disliked from '../../assets/disliked_icon.png';
import Edit from '../../assets/edit_icon.png';
import Delete from '../../assets/delete_icon.png';
import { BASE_URL } from '../../constants/BASE_URL';
import axios from 'axios';

//TODO: essas coisas do comment.algumacoisa.outracoisa é do backend né? tem q ver como está lá...

export default function CommentCard({ comment }) { //TODO: esse 'comment' tá vindo de onde?
	const { states, methods } = useContext(GlobalContext);
	const textareaRef = useRef(null);
	const [editedContent, setEditedContent] = useState(comment.content);
	const [editing, setEditing] = useState(false);
	const [userLike, setUserLike] = useState(null);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const isCurrentUserCommentCreator = states.userId === comment.creator.id;

	const checkLike = async () => {
		try {
			const headers = {
				Authorization: window.localStorage.getItem("token"),
			};
			const response = await axios.get(
				`${BASE_URL}/comments/${id}`,
                //BASE_URL + '/comments/' + comment.id + '/checklike', -- o que é checklike?
				{
					headers,
				}
			); // esse axios não está sendo feito no globalProvider?
			setUserLike(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkLike();
	}, [methods.handleLikeDislikeComment]);

	const handleCancelEdit = (event) => {
		event.stopPropagation();
		setEditing(false);
		setEditedContent(comment.content);
	};

	const handleSaveEdit = async (event) => {
		event.stopPropagation();
		await methods.handleEditComment(comment.id, editedContent);
		setEditing(false);
	};

	const handleLikeDislike = async (event, like) => {
		event.stopPropagation();
		await methods.handleLikeDislikeComment(comment.id, like);
	};

	const handleEditClick = (event) => {
		event.stopPropagation();
		setEditing(true);
	};

	const handleDeleteClick = (event) => {
		event.stopPropagation();
		setShowConfirmation(true);
	};

	const handleCancelDelete = (event) => {
		event.stopPropagation();
		setShowConfirmation(false);
	};

	const handleConfirmDelete = async (event) => {
		event.stopPropagation();
		await methods.handleDeleteComment(comment.id);
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

	return (
		<StyledContainer>
			<StyledAuthorName>Enviado por: {comment.creator.nick}</StyledAuthorName>
			{editing ? (
				<div>
					<StyledEditContentArea                    
						ref={textareaRef}
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
					/>
					<StyledRatingSection>
						<StyledButton onClick={(event) => handleSaveEdit(event)}>
							Salvar
						</StyledButton>
						<StyledButton onClick={(event) => handleCancelEdit(event)}>
							Cancelar
						</StyledButton>
					</StyledRatingSection>
				</div>
			) : (
				<StyledContent>{comment.content}</StyledContent>
			)}
			<StyledRatingSection>
				<StyledRatingContainer>
					<img
						src={userLike === 'like' ? Liked : Likes}
						alt="Like Comment"
						onClick={(event) => handleLikeDislike(event, true)}
					/>
					{comment.likes - comment.dislikes}
					<img
						src={userLike === 'dislike' ? Disliked : Dislikes}
						alt="Dislike Comment"
						onClick={(event) => handleLikeDislike(event, false)}
					/>
				</StyledRatingContainer>
				{isCurrentUserCommentCreator && (
					<StyledButton onClick={(event) => handleEditClick(event)}>
						<img src={Edit} alt="Editar Comentário" />
					</StyledButton>
				)}
				{isCurrentUserCommentCreator && (
					<StyledButton onClick={(event) => handleDeleteClick(event)}>
						<img src={Delete} alt="Deletar Comentário" />
					</StyledButton>
				)}
			</StyledRatingSection>
			{showConfirmation && (
				<StyledDeleteContainer>
					<p>Tem certeza que deseja excluir o Comentário?</p>
					<StyledButton onClick={(event) => handleConfirmDelete(event)}>
						Sim
					</StyledButton>
					<StyledButton onClick={(event) => handleCancelDelete(event)}>
						Cancelar
					</StyledButton>
				</StyledDeleteContainer>
			)}
		</StyledContainer>
	);
}