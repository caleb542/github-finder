import React from 'react'
import { createContext,  useReducer  } from "react";
import githubReducer from './GithubReducer';
const GithubContext = createContext()

const GITHUB_URL = import.meta.env.VITE_REACT_APP_GITHUB_URL
const GITHUB_TOKEN = import.meta.env.VITE_REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
        user: {},
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)


    // Get search results
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text
        }) 

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            },
        })

        const {items} = await response.json()

       dispatch({
        type: 'GET_USERS',
        payload: items,
       })
    }

    // Get Single User

    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            },
        })

        if(response.status === 404) {
            window.location = '/notfound'
        }   else {
            const data = await response.json()

            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
    }

     // Get user repos
     const getUserRepos = async (login) => {
        setLoading()
        
        const params = new URLSearchParams({
            sort : 'date',
            per_page: '10'
        }) 

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos`,{
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            },
        })

        const data = await response.json()

       dispatch({
        type: 'GET_REPOS',
        payload: data,
       })
    }
    // set loading 
    const setLoading = () => dispatch({type:'SET_LOADING'})
    
    // clear users from state
    const  clearUsers = () => dispatch({type:'CLEAR_USERS'})

    return (
        <GithubContext.Provider 
        value={{
            ...state,
            searchUsers, 
            clearUsers,
            getUser,
            getUserRepos,
        }}
        >
            {children}
        </GithubContext.Provider>)
}

export default GithubContext