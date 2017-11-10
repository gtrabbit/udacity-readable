import { combineReducers } from 'redux';

import {
	ADD_POST, EDIT_POST, REMOVE_POST, VOTE_POST,
	ADD_COMMENT, EDIT_COMMENT, REMOVE_COMMENT, VOTE_COMMENT,
	SET_INITIAL_POSTS, SET_COMMENTS,
	SET_CATEGORIES
} from '../actions/actiontypes';


// COMMENTS_SCHEMA = {
// 	'UID1': [...comments],
// 	'UID2': [...comments],
// 	'UID2': [...comments],
// 	and so on...
// }

function categories(state={}, action){
	switch(action.type){
		case SET_CATEGORIES:
			return action.cats;
		default:
			return state
	}
}


function comments(state={}, action){
	switch(action.type){

		case SET_COMMENTS:
			return {
				...state,
				[action.parentId]: [...state, ...action.comments]
			}

		case ADD_COMMENT:
			return {
				...state,
				[action.parentId]: [...state[action.parentId], action.comment]
			}

		case EDIT_COMMENT:
			var Cindex = state[action.parentId].findIndex(a=> a.id === action.commentId);
			return {
				...state,
				[action.parentId]:
					state[action.parentId].slice(0, Cindex)
					.concat(action.comment)
					.concat(state[action.parentId].slice(Cindex+1))
					
			}

		case REMOVE_COMMENT:
			var index = state[action.parentId].findIndex(a=> a.id === action.commentId);
			return {
				...state,
				[action.parentId]: state[action.parentId].slice(0, index).concat(state[action.parentId].slice(index+1))
			}


		case VOTE_COMMENT:
			var vIndex = state[action.parentId].findIndex(a=> a.id === action.id);
			var commentInMind = state[action.parentId][vIndex];
			commentInMind.voteScore += action.vote;
			return {
				...state,
				[action.parentId]: 
					state[action.parentId].slice(0, vIndex)
					.concat(commentInMind)
					.concat(state[action.parentId].slice(vIndex+1))
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
				[action.post.category]: [...state[action.post.category], action.post]
			}

		case EDIT_POST:
			let Pindex = state[action.cat].findIndex(a=> a.id === action.post.id);
			return {
				...state,
				[action.cat]: 
					state[action.cat].slice(0, Pindex)
					.concat(action.post)
					.concat(state[action.cat].slice(Pindex+1))
			}

		case REMOVE_POST:
			console.log(action)
			let index = state[action.cat].findIndex(a=> a.id === action.id);

			return {
				...state,
				[action.cat]: state[action.cat].slice(0, index).concat(state[action.cat].slice(index+1))
			}
			
		case VOTE_POST:
			let vIndex = state[action.category].findIndex(a=> a.id === action.id);
			let postInMind = state[action.category][vIndex];
			postInMind.voteScore += action.vote;
			return {
				...state,
				[action.category]: 
					state[action.category].slice(0, vIndex)
					.concat(postInMind)
					.concat(state[action.category].slice(vIndex+1))
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
	comments, posts, categories
})