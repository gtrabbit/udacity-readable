import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../actions/commentactions';
import CommentDetail from './commentdetail';
import AddComment from './addcomment';
import {sortBy} from '../utils/helpers';
import { withRouter } from 'react-router';



class CommentList extends Component {

	state={
		noComments: undefined
	}

	componentDidMount(){
		if (!this.state.noComments) this.props.getPostComments(this.props.postId)
	}

	componentWillReceiveProps(nextProps){
		this.setState({noComments: nextProps.comments.length ? false : true})
	}

	render(){
		if (this.state.noComments === true){
			return (
					<div className="add-comment-prompt">
						Be the first to comment on this post!
						<AddComment parentId={this.props.postId} />
					</div>
					)

		} else if (!this.state.noComments) {
			let {comments} = this.props;
			if (comments.length){
				comments = sortBy(comments, 'voteScore');
				return (
					<aside className="comments-list">
					
					Comments: ({comments.length})
					<AddComment parentId={this.props.postId}/>
					 <hr />
					{comments.map((a,i)=>(
						<CommentDetail key={i} comment={a} />
						))}
					
					</aside>
				)
			} else {
				return (
				<h3> Loading Comments </h3>
				)
			}

		}

	}
}


function mapStateToProps({comments}, ownProps){
	return {comments}
}

function mapDispatchToProps(dispatch){
	return {
		getPostComments: (postId) => dispatch(getComments(postId))
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps)(CommentList));