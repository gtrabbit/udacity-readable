import React from 'react';
import { deletePostFromServer } from '../actions/postactions';
import { connect } from 'react-redux';


const PostDeleter = props => {

	const deleter = ()=>{
		props.deletePost(props.postId, props.postCategory)
	}

		return (
			<button onClick={deleter}> delete </button>
			)
}


function mapDispatchToProps(dispatch){
	return {
		deletePost: (id, cat)=>dispatch(deletePostFromServer(id, cat))
	}
}


export default connect(
	null,
	mapDispatchToProps)(PostDeleter);