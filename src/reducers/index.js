import { combineReducers } from 'redux';

import {
	ADD_POST, REMOVE_POST, VOTE_POST,
	ADD_COMMENT, REMOVE_COMMENT, VOTE_COMMENT,
	SET_INITIAL_POSTS
} from '../actions';


// COMMENTS_SCHEMA = {
// 	'UID1': [...comments],
// 	'UID2': [...comments],
// 	'UID2': [...comments],
// 	and so on...
// }


function comments(state={}, action){
	switch(action.type){
		case ADD_COMMENT:
			return {
				...state,
				[action.parentId]: [...state[action.parentId], action.comment]
			}


		case REMOVE_COMMENT:
			let index = state.findIndex(a=> a.id === action.commentId);
			return {
				...state,
				[action.parentId]: [state[action.parentId].slice(0, index).concat(state[action.parentId].slice(index+1))]
			}


		case VOTE_COMMENT:
			let voteIndex = state.findIndex(a=> a.id === action.commentId);
			return {
				...state,
				[action.parentId]: [...state[action.parentId], state[action.parentId][voteIndex].voteScore += action.amount]
			}

		default:
			return state;
	}
}

// POSTS_SCHEMA = {
// 	'CATEGORY1': [...posts],
// 	'CATEGORY2': [...posts],
// 	'CATEGORY3': [...posts],
// 	and so on...
// }


function posts(state={}, action){
	switch(action.type){
		case ADD_POST:
			return {
				...state,
				[action.cat]: [...state[action.cat], action.post]
			}

		case REMOVE_POST:
			let index = state.findIndex(a=> a.id === action.id);
			return {
				...state,
				[action.cat]: [state[action.cat].slice(0, index).concat(state[action.cat].slice(index+1))]
			}
			
		case VOTE_POST:
			let voteIndex = state.findIndex(a=> a.id === action.id);
			return {
				...state,
				[action.cat]: [...state[action.cat], state[action.cat][voteIndex].voteScore += action.amount]
			}

		case SET_INITIAL_POSTS:
			return {
				redux: action.posts.filter(a=>(a.category==='redux')),
				react: action.posts.filter(a=>(a.category==='react')),
				udacity: action.posts.filter(a=>(a.category==='udacity')),
			}

		default:
			return state;
	}
}


export default combineReducers({
	comments, posts
})