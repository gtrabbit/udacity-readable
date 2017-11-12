import * as C from './actiontypes'
import {headers, baseUrl} from './index';


//==================================================//
//******************Post Actions********************//
//==================================================//


export function getOnePost(id){
	const url = baseUrl + 'posts/' + id;
	return (dispatch)=>{
		fetch(url, headers).then(res=>(res.json())
			).then(
				res=> dispatch(setInitialPosts([res])),
				err=> dispatch(noPostFound)
			)
	}
}



export function noPostFound(){
	return {
		type: C.SHOW_ONE_POST,
		post: null
	}
}

//-------------------

export function setInitialPosts(posts){
	return {
		type: C.SET_INITIAL_POSTS,
		posts
	}
}


export function getInitialPosts(cat){

	const url = cat === 'all' 
		? baseUrl + 'posts'
		: baseUrl + cat + '/posts';
    return (dispatch)=>{
    	return fetch(url, headers).then((res)=>(res.json())).then(
    		res=> dispatch(setInitialPosts(res)),
    		err => console.log(err)
    	)
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
				res=> console.log('added post to server'),
				err=> console.log('error posting', err)
			)
	}
}

//--------------------

export function editPost(post){
	return {
		type: C.EDIT_POST,
		post, cat: post.category
	}
}


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


//-----------------------

export function removePost(id, cat){
	return {
		type: C.REMOVE_POST,
		cat,
		id
	}
}


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

//----------------------

export function votePost(id, vote, category){
	let amount = vote === 'upVote' ? 1 : -1;
	return {
		type: C.VOTE_POST,
		category,
		id,
		vote: amount
	}
}


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