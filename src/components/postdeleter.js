import React, { Component } from 'react';
import { deletePostFromServer } from '../actions';
import { connect } from 'react-redux';


class PostDeleter extends Component {

	deleter = ()=>{
		this.props.deletePost(this.props.postId, this.props.postCategory)
		this.props.route.history.push(`/${this.props.postCategory}`)
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

function mapStateToProps({state}, ownProps){
	const {postId, postCategory} = ownProps;
	return {postId, postCategory}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(PostDeleter);