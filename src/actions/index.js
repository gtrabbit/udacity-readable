import { uuid } from 'uuid/v1';

export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const VOTE_POST = 'VOTE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const SET_INITIAL_POSTS = 'SET_INITIAL_POSTS';


const makeUUID = () => uuid();


export function getInitialPosts(){
	const url = 'http://localhost:3001/posts'
    const headers = {headers: {'Authorization': 'sparkle-cat-server'}}
    return (dispatch)=>{
    	return fetch(url, headers).then((res)=>(res.json())).then(
    		res=> dispatch(setInitialPosts(res)),
    		err => console.log(err)
    	)
    }
}

export function setInitialPosts(posts){
	return {
		type: SET_INITIAL_POSTS,
		posts
	}
}

// need to add async middleware for this...


export function addPost({cat, post}){
	post.id = makeUUID();
	return {
		type: ADD_POST,
		post,
		cat
	}
}

export function removePost({cat, id}){
	return {
		type: REMOVE_POST,
		cat,
		id
	}
}

export function votePost({cat, id, amount}){
	return {
		type: VOTE_POST,
		cat,
		id,
		amount
	}
}

export function addComment({parentId, comment}){
	comment.id = makeUUID();
	return {
		type: ADD_COMMENT,
		parentId,
		comment
	}
}

export function removeComment({parentId, commentId}){
	return {
		type: REMOVE_COMMENT,
		parentId,
		commentId,
	}
}

export function voteComment({parentId, commentId, amount}){
	return {
		type: VOTE_COMMENT,
		parentId,
		commentId,
		amount
	}
}
