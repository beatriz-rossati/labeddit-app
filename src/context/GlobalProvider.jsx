import axios, { Axios } from "axios";
import { useEffect, useState } from "react";

import { GlobalContext } from "../context/GlobalContext"
import { BASE_URL } from "../constants/BASE_URL";

export const GlobalProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState();

    const getPosts = async () => {
        try {
            const posts = await axios.get(`${BASE_URL}/posts`, { headers: { Authorization: localStorage.getItem("token") } })
            setPosts(posts.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getComments = async (postId) => {
        try {
            const comments = await axios.get(`${BASE_URL}/comments`, { params: { postId: postId } }, { headers: { Authorization: localStorage.getItem("token") } })
            setComments(comments.data);
        } catch (error) {
            console.log(error)
        }
    }// postId é uma path variable, isso está funcionando??

    const handleRatingPost = async (postId, rating) => {
        try {
            const headers = {
                Authorization: window.localStorage.getItem("token"),
            };
            const body = {
                rating,
            };
            await axios.put(
                `${BASE_URL}/posts/${postId}/rate`, body, { headers }
            );
        } catch (error) {
            console.log(error);
        }
    };// não entendi como passar o postId, se é assim ou { params: { postId: postId } }, pois o postId é uma path variable tbm
    // mas daí também, onde ele se encaixaria com o rating?

    const handleRatingComment = async (commentId, rating) => {
        try {
            const headers = {
                Authorization: window.localStorage.getItem("token"),
            };
            const body = {
                rating,
            };
            await axios.put(
                `${BASE_URL}/posts/${commentId}/rate`, body, { headers }
            );
        } catch (error) {
            console.log(error);
        }
    };//de onde está vindo esse commentId?

    const handleEditPost = async (postId, editedContent) => {
        try {
            const headers = {
                Authorization: window.localStorage.getItem("token"),
            };
            const body = {
                editedContent,
            };
            await axios.put(
                `${BASE_URL}/posts/${postId}`, body, { headers }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditComment = async (commentId, editedContent) => {
        try {
            const headers = {
                Authorization: window.localStorage.getItem("token"),
            };
            const body = {
                editedContent,
            };
            await axios.put(
                `${BASE_URL}/comments/${commentId}`, body, { headers }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            setPosts(posts.filter(post => post.id !== postId))
            await axios.delete(`${BASE_URL}/posts/${postId}`, {
                headers: {
                    Authorization: window.localStorage.getItem("token"),
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            setComments(posts.filter(comment => comment.id !== commentId))
            await axios.delete(`${BASE_URL}/comments/${commentId}`, {
                headers: {
                    Authorization: window.localStorage.getItem("token"),
                }
            })

        } catch (error) {
            console.log(error);
        }
    };

    const states = { posts, comments, setUserId, userId }
    const methods = { getPosts, getComments, handleRatingPost, handleRatingComment, handleEditPost, handleEditComment, handleDeletePost, handleDeleteComment }


    return (
        <GlobalContext.Provider value={{
            states,
            methods
        }}>
            {children}
        </GlobalContext.Provider>
    )
}