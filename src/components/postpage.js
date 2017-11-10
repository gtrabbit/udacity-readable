import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { dateOptions } from '../utils/helpers';
import Voter from './voter';
import { deletePostFromServer } from '../actions';
import CommentList from './commentslist';
import NotFound from './notfound';


class PostPage extends Component {

	state={
		voted: false,
		attempts: 0
	}




	deleter = ()=>{
		this.props.deletePost(this.props.post.id, this.props.post.category)
		this.props.route.history.push(`/${this.props.post.category}`)
	}

	render(){
		if (this.props.hasOwnProperty('post') && this.props.post && this.props.post.hasOwnProperty('id')){
			const {id, title, body, author, category, voteScore, timestamp} = this.props.post;
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
							<Link to={`/post/edit?id=${id}`} className="link-to-button" > edit </Link>
							<button onClick={this.deleter}> delete </button>

							<Voter id={id} category={category}/>
							<span className="popularity-score"> ({voteScore}) </span>
						</div>
						<hr />
					</article>
					<CommentList postId={this.props.route.match.params.id} />
				</section>
				)
			} else {
				return (
					<NotFound />
					)
			}
			
		}

}

function mapStateToProps({posts}, ownProps){
	return {post: posts[ownProps.cat].find(a=>a.id===ownProps.postId)}
}

function mapDispatchToProps(dispatch){
	return {
		deletePost: (id, cat)=>dispatch(deletePostFromServer(id, cat))
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps)(PostPage));