import { combineReducers } from 'redux';

import {
	EDIT_POST, REMOVE_POST, VOTE_POST,
	ADD_COMMENT, EDIT_COMMENT, REMOVE_COMMENT, VOTE_COMMENT,
	SET_INITIAL_POSTS, SET_COMMENTS, SHOW_ONE_POST,
	SET_CATEGORIES
} from '../actions/actiontypes';



function categories(state={}, action){
	switch(action.type){
		case SET_CATEGORIES:
			return action.cats;
		default:
			return state
	}
}


function comments(state=[], action){
	switch(action.type){

		case SET_COMMENTS:
			return action.comments

		case ADD_COMMENT:

			return [...state, action.comment]

		case EDIT_COMMENT:
			var Cindex = state.findIndex(a=> a.id === action.commentId);
			return state.slice(0, Cindex)
				.concat(action.comment)
				.concat(state.slice(Cindex+1));

		case REMOVE_COMMENT:
			var index = state.findIndex(a=> a.id === action.commentId);
			return state.slice(0, index).concat(state.slice(index+1));

		case VOTE_COMMENT:
			var vIndex = state.findIndex(a=> a.id === action.id);
			var commentInMind = state[vIndex];
			commentInMind.voteScore += action.vote;
			return state.slice(0, vIndex)
				.concat(commentInMind)
				.concat(state.slice(vIndex+1));

		default:
			return state;
	}
}


function posts(state={}, action){
	switch(action.type){

		case SHOW_ONE_POST:
			return action.post;

		case EDIT_POST:
			return [action.post]

		case REMOVE_POST:
			let index = state.findIndex(a=> a.id === action.id);
			return state.slice(0, index).concat(state.slice(index+1))
			
		case VOTE_POST:
			let vIndex = state.findIndex(a=> a.id === action.id);
			let postInMind = state[vIndex];
			postInMind.voteScore += action.vote;
			return state.slice(0, vIndex)
				.concat(postInMind)
				.concat(state.slice(vIndex+1))

		case SET_INITIAL_POSTS:
			return action.posts.length
				? action.posts
				: {posts: null};

		default:
			return state;
	}
}


export default combineReducers({
	comments, posts, categories
})