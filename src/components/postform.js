import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Post } from '../utils/datatypes';
import { addPostToServer, editPostOnServer } from '../actions';


class PostForm extends Component {


	handleSubmit = (e)=>{
		e.preventDefault();
		const {body, author, title, category} = e.target;
		let post;

		if (this.props.hasOwnProperty('post')){
			post = this.props.post;
			post.body = body.value;
			post.title = title.value;
			this.props.sendEdit(post)
		} else {
			post = new Post(body.value.trim(), author.value.trim(), title.value.trim(), category.value);
			this.props.sendPost(post)
		}
		this.props.route.history.push(`/${category.value}/${post.id}`)

	}


	render(){

		let author, body, category, readOnly, title;

		if (this.props.hasOwnProperty('post')){
			category = this.props.post.category;
			body = this.props.post.body;
			title = this.props.post.title;
			author = this.props.post.author;
			readOnly = true;
		} 

		if (!this.props.post && this.props.route.match.params.type === 'edit'){
			return (
				<p> loading... </p>
				)

		} else {
			return (
				<form className="post-form" onSubmit={this.handleSubmit}>
					<label htmlFor="title"> Title: 
					<input required type="text" name="title"
						defaultValue={title}
						placeholder='post title...' /> </label>
					
					<label htmlFor="author"> Author: 
					<input required type="text" name="author" 
						value={author}
						readOnly={readOnly}
						placeholder='your name...' /> </label>
					<label htmlFor="category"> Category: 
					<select required name='category' disabled={readOnly} defaultValue={category}>
						<option value='' > Select a Category </option> 
						{this.props.categories.length && this.props.categories.map(a=>(
							<option 
								key={a.name} 
								value={a.name}>
								{a.name}
							</option>
							))} 
						
					</select> 
					</label>

					<label htmlFor="body"> Your post: 
					<textarea required name="body" 
						defaultValue={body} 
						placeholder="write your post..." /> </label> 
				

					<input type="submit" name="submit" />
				</form>
				)
		}
	}
}

function mapStateToProps({posts, categories}, ownProps){
	for (let key in posts){
		let post = posts[key].find(a=>(a.id===ownProps.route.location.search.slice(4)))
		if (post)	return {post, categories};
		
	}
	return {categories}
}

function mapDispatchToProps(dispatch){
	return {
		sendPost: (post) => dispatch(addPostToServer(post)),
		sendEdit: (post) => dispatch(editPostOnServer(post))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(PostForm)