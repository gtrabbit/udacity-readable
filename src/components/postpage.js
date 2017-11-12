import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { dateOptions } from '../utils/helpers';
import Voter from './voter';
import { deletePostFromServer, getOnePost } from '../actions/postactions';
import CommentList from './commentslist';
import NotFound from './notfound';


class PostPage extends Component {

	state={
		voted: false,
	}

	componentWillMount(){
		if (this.props.getThePostYourself){
			this.props.goGetOnePost(this.props.postId)
		}

	}

	componentWillReceiveProps(nextProps){
		if (nextProps.hasOwnProperty('posts') 
			&& nextProps.posts[0].hasOwnProperty('error')){
			nextProps.history.push(`/${nextProps.cat}`)
		}
	}

	deleter = ()=>{
		this.props.deletePost(this.props.posts[0].id, this.props.posts[0].category)
		this.props.route.history.push(`/${this.props.posts[0].category}`)
	}

	render(){
		if (!this.props.getThePostYourself && this.props.posts.length && !this.props.posts[0].hasOwnProperty('error')){
			const {id, title, body, author, category, voteScore, timestamp} = this.props.posts[0];
			const date = new Date(timestamp).toLocaleDateString('en-us', dateOptions)
			return (
				<section>
					<article>
						<div>
							<h2> {title} </h2>
							<span className="by-line"> by {author} </span>
							<hr />
							<div className="post-meta">
								<span> posted in {category.slice(0,1).toUpperCase().concat(category.slice(1))} </span>
								<span> on {date} </span>
							</div>
						</div>
						
						
						<p className="post-body"> {body} </p>
						<div className="post-voting">
							<Link to={`/post/edit/${id}`} className="link-to-button" > edit </Link>
							<button onClick={this.deleter}> delete </button>

							<Voter id={id} category={category}/>
							<span className="popularity-score"> ({voteScore}) </span>
						</div>
						<hr />
					</article>
					<CommentList postId={this.props.route.match.params.id} />
				</section>
				)
			} else if (!this.props.getThePostYourself){
				return (
					<NotFound />
					)
			} else {
				return (
					<section> loading... </section>
					)
			}
			
		}

}


function mapStateToProps({posts}){
	return posts.length === 1
		? {posts}
		: {getThePostYourself: true}	
}

function mapDispatchToProps(dispatch){
	return {
		deletePost: (id, cat)=>dispatch(deletePostFromServer(id, cat)),
		goGetOnePost: (id)=>dispatch(getOnePost(id))
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps)(PostPage));