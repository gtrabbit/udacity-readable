import React from 'react';
import { connect } from 'react-redux';
import {addCommentToServer, editCommentOnServer} from '../actions/commentactions';
import {Comment} from '../utils/datatypes';


const CommentForm = props => {

	const handleSubmit = (e)=>{
		e.preventDefault();
		const {body, author} = e.target;
		if (props.hasOwnProperty('comment')){
			let {comment} = props;
			comment.body = body.value;
			comment.edited = Date.now();
			props.sendEdit(comment);	
		} else {
			let comment = new Comment(body.value, author.value, props.parentId)
			props.sendComment(comment);
		}
		props.close();		
	}


		return (
			<div className="comment-form">
				<form onSubmit={handleSubmit}>
					<label htmlFor="author"> Author: 
						<input type="text" name="author"
							disabled={props.hasOwnProperty('comment')}
							placeholder={props.hasOwnProperty('comment')
														? props.comment.author
														: 'your name'} />
					</label>
					<label htmlFor="body"> Your Comment: </label>
					<textarea defaultValue={props.hasOwnProperty('comment') ? props.comment.body : ""} name="body" placeholder="Your comment goes here..." />
					<input type="submit" name="submit" value="submit" /> 
				</form>
			</div>
		)
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