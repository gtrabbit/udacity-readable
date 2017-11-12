import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dateOptions } from '../utils/helpers';
import CommentForm from './commentform';
import { withRouter } from 'react-router';
import ThumbsUp from 'react-icons/lib/ti/thumbs-up';
import ThumbsDown from 'react-icons/lib/ti/thumbs-down';
import {removeCommentFromServer, voteCommentOnServer} from '../actions/commentactions';


class CommentDetail extends Component {


	state = {
		editComment: false,
		voted: false
	}

	toggleShow = ()=>{
		this.setState(state=>{
			state.editComment = !state.editComment
			return state
		})
	}

	deleteComment = ()=>{
		this.props.deleter(this.props.comment)
	}

	voteUp = ()=>{
		this.setState({voted: true})
		this.props.voteUp(this.props.comment.id, this.props.comment.parentId);
	}

	voteDown = ()=>{
		this.setState({voted: true})
		this.props.voteDown(this.props.comment.id, this.props.comment.parentId);
	}

	render(){
		const {author, body, timestamp, voteScore} = this.props.comment
		const date = new Date(timestamp).toLocaleDateString('en-us', dateOptions)
		return (
			<div className="comment-detail" style={voteScore > 0 
				? {backgroundColor: `rgba(5, 209, 46, ${voteScore/50})`}
				: {backgroundColor: `rgba(158, 54, 19, ${Math.abs(voteScore/50)})`}}>
			<div><h3> {author} </h3> <span className="popularity-score"> ({voteScore}) </span> </div>
			<p> {body} </p> <hr />
			<p className="comment-meta">
				
				<span> {date} </span>
				{this.props.comment.edited && <span> Edited: {new Date(this.props.comment.edited).toLocaleDateString('en-us', dateOptions)} </span> }
			</p>
			<button onClick={this.toggleShow}> 
				{this.state.editComment 
					? 'Dismiss'
					: 'Edit'}
			</button>
			{this.state.editComment && <CommentForm close={this.toggleShow} comment={this.props.comment} />}
			<button onClick={this.deleteComment}> Delete </button>
			<button disabled={this.state.voted} onClick={this.voteUp}> <ThumbsUp /> </button>
			<button disabled={this.state.voted} onClick={this.voteDown}> <ThumbsDown /> </button>

			</div>
			)
	}
}

function mapStateToProps({comments}){
	return {comments}
}

function mapDispatchToProps(dispatch){
	return {
		deleter: (comment)=> dispatch(removeCommentFromServer(comment)),
		voteDown: (id, parentId)=> dispatch(voteCommentOnServer(id, 'downVote', parentId)),
		voteUp: (id, parentId)=> dispatch(voteCommentOnServer(id, 'upVote', parentId))
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps)(CommentDetail));