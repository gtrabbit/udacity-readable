export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const VOTE_POST = 'VOTE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const SET_INITIAL_POSTS = 'SET_INITIAL_POSTS';
export const SET_COMMENTS = 'SET_COMMENTS';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const GET_CATEGORIES = 'GET_CATEGORIES';



//async action handlers followed by their sync resulting calls


const headers = {headers: {'Authorization': 'sparkle-cat-server2',
							'Content-Type': 'application/json'}}
const baseUrl = 'http://localhost:3001/';

//-----------------

export function getCategories(){
	const url = baseUrl + 'categories'
	return (dispatch)=>{
		return fetch(url, headers).then(res=>(res.json())).then(
			res=> dispatch(setCategories(res.categories)),
			err=> console.log(err)
			)
	}
}

export function setCategories(cats){
	return {
		type: SET_CATEGORIES,
		cats
	}
}


//-------------------

export function getInitialPosts(){
	const url = baseUrl + 'posts'
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

// ----------------------

export function getComments(id){
	const url = `${baseUrl}posts/${id}/comments`
	return (dispatch)=>{
		return fetch(url, headers).then(res=> res.json()
		).then(
			res=> dispatch(setComments(res, id)),
			err=> console.log("there was an error", err))
	}
}

export function setComments(comments, id){
	return {
		type: SET_COMMENTS,
		comments,
		parentId: id
	}
}

// ------------------------

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

export function addComment(comment){
	return {
		type: ADD_COMMENT,
		parentId: comment.parentId,
		comment
	}
}

// -----------------------


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

export function editComment(comment){
	return {
		type: EDIT_COMMENT,
		parentId: comment.parentId,
		commentId: comment.id,
		comment
	}
}

// --------------


export function removeCommentFromServer(comment){
	const url = `${baseUrl}comments/${comment.id}`
	const options = {...headers, method: 'DELETE'}

	return dispatch=>{
		return fetch(url, options).then(res=> res.json()
			).then(
				res=> dispatch(removeComment(comment.parentId, comment.id)),
				err=> console.log("error deleting", err)
			)
	}
}

export function removeComment(parentId, commentId){
	return {
		type: REMOVE_COMMENT,
		parentId,
		commentId,
	}
}


//--------------------

export function addPostToServer(post){
	const url = `${baseUrl}posts`;
	const options = {...headers, method: 'POST',
					body: JSON.stringify(post)};

	return dispatch=>{
		return fetch(url, options).then(res=> res.json()
			).then(
				res=> dispatch(addPost(post)),
				err=> console.log('error posting', err)
			)
	}
}


export function addPost(post){
	return {
		type: ADD_POST,
		post
	}
}


//--------------------

export function editPostOnServer(post){
	const {id, body, title} = post;

	const url = `${baseUrl}posts/${id}`;
	const options = {...headers, method: 'PUT',
					body: JSON.stringify({
						body, title
					})}
	return dispatch=>{
		return fetch(url, options).then(res=>res.json()
			).then(
				res=> dispatch(editPost(post)),
				err=> console.log('editing did not work!')
			)
	}
}


export function editPost(post){
	return {
		type: EDIT_POST,
		post, cat: post.category
	}
}



//-----------------------


export function deletePostFromServer(id, cat){
	const url = `${baseUrl}posts/${id}`;
	const options = {...headers, method: 'DELETE'};
	return dispatch=>{
		return fetch(url, options).then(res=>res.json()
			).then(
				res=> dispatch(removePost(id, cat)),
				err=> console.log('some posts never die')
			)
	}
}

export function removePost(id, cat){
	return {
		type: REMOVE_POST,
		cat,
		id
	}
}


//----------------------

export function votePostOnServer(id, vote, category){
	const url = `${baseUrl}posts/${id}`;
	const options = {...headers, method: 'POST',
					body: JSON.stringify({option: vote})}
	return dispatch=>{
		return fetch(url, options).then(res=>res.json()
			).then(
				res=> dispatch(votePost(id, vote, category)),
				err=> console.log('voting is pointless')
				)
	}
}

export function votePost(id, vote, category){
	let amount = vote === 'upVote' ? 1 : -1;
	return {
		type: VOTE_POST,
		category,
		id,
		vote: amount
	}
}


//-----------------------

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


export function voteComment(id, vote, parentId){
	let amount = vote === 'upVote' ? 1 : -1;
	return {
		type: VOTE_COMMENT,
		parentId,
		id,
		vote: amount
	}
}
