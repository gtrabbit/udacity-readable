import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../actions';
import CommentDetail from './commentdetail';
import AddComment from './addcomment';
import {sortBy} from '../utils/helpers';




class CommentList extends Component {

	componentWillMount(){
		if (this.props.loadingComments) this.props.getPostComments(this.props.postId)
	}


	render(){
		if (this.props.loadingComments){
			return (
				<h3> Loading Comments </h3>
				)
		} else {
			let {comments} = this.props;
			if (comments.length){
				comments = sortBy(comments, 'voteScore');
				return (
					<aside className="comments-list">
					<AddComment parentId={this.props.postId}/>
					Comments: ({comments.length})
					{comments.map((a,i)=>(
						<CommentDetail key={i} comment={a} />
						))}
					
					</aside>
				)
			} else {
				return (
					<div className="add-comment-prompt">
						Be the first to comment on this post!
						<AddComment parentId={this.props.postId} />
					</div>
					)
			}

		}

	}
}


function mapStateToProps({comments}, ownProps){
	if (comments.hasOwnProperty(ownProps.postId)){
		return {comments: comments[ownProps.postId],
				loadingComments: false}
	} else {
		return {loadingComments: true}
	}
	
}

function mapDispatchToProps(dispatch){
	return {
		getPostComments: (postId) => dispatch(getComments(postId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(CommentList);