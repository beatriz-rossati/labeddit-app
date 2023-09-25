import axios, { Axios } from "axios";
import { useEffect, useState } from "react";

import { GlobalContext } from "../context/GlobalContext"
import { BASE_URL } from "../constants/BASE_URL";

export const GlobalProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const getPosts = async () => {
        try {
            const posts = await axios.get(`${BASE_URL}/posts`, { Authorization: localStorage.getItem("token") })
            setPosts(posts.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getComments = async (postId) => {
        try {
            const comments = await axios.get(`BASE_URL/comments`, { params: { postId: postId } }, { Authorization: localStorage.getItem("token") })
            setComments(comments.data);
        } catch (error) {
            console.log(error)
        }
    }

    const states = { posts, comments} 
    const methods = { getPosts, getComments }


    return (
        <GlobalContext.Provider value={{
            states,
            methods
        }}>
            {children}
        </GlobalContext.Provider>
    )
}