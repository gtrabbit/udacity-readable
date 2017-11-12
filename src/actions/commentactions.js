import * as C from './actiontypes'
import {headers, baseUrl} from './index';

//==================================================//
//****************Comment Actions*******************//
//==================================================//


// ----------------------

export function setComments(comments, id){
	return {
		type: C.SET_COMMENTS,
		comments,
		parentId: id
	}
}

export function getComments(id){
	const url = `${baseUrl}posts/${id}/comments`
	return (dispatch)=>{
		return fetch(url, headers).then(res=> res.json()
		).then(
			res=> dispatch(setComments(res, id)),
			err=> console.log("there was an error", err))
	}
}

// ------------------------

export function addComment(comment){
	return {
		type: C.ADD_COMMENT,
		parentId: comment.parentId,
		comment
	}
}

export function addCommentToServer(comment){
	const url = `${baseUrl}comments`;
	const options = {...headers, method: 'POST',
					body: JSON.stringify(comment)}
	return (dispatch)=>{
		return fetch(url, options).then(res=> res.json()
			).then(
				res=> dispatch(addComment(comment)),
				err=> console.log("error in actions", err)
			)
	}

}

// -----------------------

export function editComment(comment){
	return {
		type: C.EDIT_COMMENT,
		parentId: comment.parentId,
		commentId: comment.id,
		comment
	}
}

export function editCommentOnServer(comment){
	const url = `${baseUrl}comments/${comment.id}`
	const options = {...headers, method: 'PUT',
					body: JSON.stringify(comment)}
	return (dispatch)=>{
		return fetch(url, options).then(res=> res.json()
			).then(
				res=> dispatch(editComment(comment)),
				err=> console.log("error in actions", err)
			)
	}
}

// --------------

export function removeComment(commentId, parentId){
	return {
		type: C.REMOVE_COMMENT,
		parentId,
		commentId,
	}
}

export function removeCommentFromServer(comment){
	const url = `${baseUrl}comments/${comment.id}`
	const options = {...headers, method: 'DELETE'}

	return dispatch=>{
		return fetch(url, options).then(res=> res.json()
			).then(
				res=> dispatch(removeComment(comment.id, comment.parentId)),
				err=> console.log("error deleting", err)
			)
	}
}


//-----------------------


export function voteComment(id, vote, parentId){
	let amount = vote === 'upVote' ? 1 : -1;
	return {
		type: C.VOTE_COMMENT,
		parentId,
		id,
		vote: amount
	}
}


export function voteCommentOnServer(id, vote, parentId){
	const url = `${baseUrl}comments/${id}`;
	const options = {...headers, method: 'POST',
					body: JSON.stringify({option: vote})};
	return dispatch=>{
		return fetch(url, options).then(res=>res.json()
			).then(
				res=> dispatch(voteComment(id, vote, parentId)),
				err=> console.log('voting is pointless')
			)
	}
}
