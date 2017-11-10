import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addCommentToServer, editCommentOnServer} from '../actions';
import {Comment} from '../utils/datatypes';


class CommentForm extends Component {

	handleSubmit = (e)=>{
		e.preventDefault();
		const {body, author} = e.target;
		
		
		if (this.props.hasOwnProperty('comment')){
			let {comment} = this.props;
			comment.body = body.value;
			comment.edited = Date.now();
			this.props.sendEdit(comment)
			
		} else {
			let comment = new Comment(body.value, author.value, this.props.parentId)
			this.props.sendComment(comment);
		}
		this.props.close()
		
	}



	render(){
		return (
			<div className="comment-form">
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="author"> Author: 
						<input type="text" name="author"
							disabled={this.props.hasOwnProperty('comment')}
							placeholder={this.props.hasOwnProperty('comment')
														? this.props.comment.author
														: 'your name'} />
					</label>
					<label htmlFor="body"> Your Comment: </label>
					<textarea defaultValue={this.props.hasOwnProperty('comment') ? this.props.comment.body : ""} name="body" placeholder="Your comment goes here..." />
					<input type="submit" name="submit" /> 
				</form>
			</div>
		)
	}
}

function mapStateToProps(){
	return {}
}

function mapDispatchToProps(dispatch){
	return {
		sendComment: (comment) => dispatch(addCommentToServer(comment)),
		sendEdit: (comment) => dispatch(editCommentOnServer(comment))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(CommentForm);