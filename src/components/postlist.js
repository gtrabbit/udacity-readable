import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { sortBy } from '../utils/helpers';
import Voter from './voter';
import PostDeleter from './postdeleter';
import { getInitialPosts } from '../actions/postactions';


class PostList extends Component {

	componentDidMount(){
		this.props.getInitialPosts(this.props.cats);	
	}

	sortOptions = [{value: 'voteScore',	display: 'Highest-Voted'},
					{value: 'timestamp', display: 'Newest'},
					{value: 'author', display: 'Author'},
					{value: 'commentCount', display: 'Comments'}]

	state = {
		sorter: this.sortOptions[0]
	}

	reOrder = (e) =>{
		this.setState({sorter: this.sortOptions[e.target.selectedIndex]})
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.cats !== this.props.cats) this.props.getInitialPosts(nextProps.cats);
		if (nextProps.redirect) this.props.history.push('/');

	}

	render(){
		if (this.props.redirect){
			return (
				<section> You are being redirected to something that actually exists </section>
				)
		}

		else if (!this.props.posts){
			return (
				<section className="post-list">
					<p> There are no posts in this category. Be the first! </p>
					<Link to={'/post/new/new'}> New Post </Link>
				</section>
				)
		}

		else if (this.props.loadingPosts){
			return (
				<p> Loading... </p>
			)
		} else {
			let posts = sortBy(this.props.posts, this.state.sorter.value);
			return (
				<section className="post-list">
					<div>
						<Link to={'/post/new/new'}> New Post </Link>
					</div>
						<label htmlFor="sortValue" className="sort-label"> Sort by: 
						<select className="sorter" name='sortValue' onChange={this.reOrder}>
							{this.sortOptions.map(a=>(
								<option key={a.value} value={a.value}> {a.display} </option>
								))}
						</select>
						</label>

					<ul>
					{
					posts.map(a=>(
						<li key={a.id} className="post-list-element" style={a.voteScore > 0 
						? {backgroundColor: `rgba(5, 209, 46, ${a.voteScore/50})`}
						: {backgroundColor: `rgba(158, 54, 19, ${Math.abs(a.voteScore/50)})`}}>
							<span><Link to={'/' + a.category + '/' + a.id}> {a.title} </Link></span>
							<span>in <Link to={'/'+ a.category}> {a.category.slice(0,1).toUpperCase().concat(a.category.slice(1))}</Link> by {a.author}</span>
							<p> Popularity <span className="popularity-score">({a.voteScore})</span> / Comments ({a.commentCount}) </p>
							<span>
								<Voter id={a.id} category={a.category} />
								<PostDeleter postId={a.id} postCategory={a.category} />
								<Link to={`/post/edit/${a.id}`} className="link-to-button" > edit </Link>
							</span>
						</li>

						))	
					}
					</ul>
					<div>
						<Link to={'/post/new/new'}> New Post </Link>
					</div>
				</section>
				)
		}
	}
}

function mapStateToProps({posts, categories}, ownProps){
	let redirect;
	if (ownProps.cats !== 'all' && categories.length && !categories.find(a=>a.name===ownProps.cats)){
		redirect = true;
		return {redirect};
	} else if (posts.length && !posts[0].hasOwnProperty('error')){
		return {posts}
	} else if (!posts) {
		return {noPosts: true}
	} else {
		return {loadingPosts: true}
	}

}

function mapDispatchToProps(dispatch){
	return {
		getInitialPosts: (cat) => dispatch(getInitialPosts(cat))
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps)(PostList));