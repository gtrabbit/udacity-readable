import React, { Component } from 'react';
import { deletePostFromServer } from '../actions/postactions';
import { connect } from 'react-redux';


class PostDeleter extends Component {

	deleter = ()=>{
		this.props.deletePost(this.props.postId, this.props.postCategory)
	}

	render(){
		return (
			<button onClick={this.deleter}> delete </button>
			)
	}
}


function mapDispatchToProps(dispatch){
	return {
		deletePost: (id, cat)=>dispatch(deletePostFromServer(id, cat))
	}
}


export default connect(
	null,
	mapDispatchToProps)(PostDeleter);