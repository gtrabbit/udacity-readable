import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { arrayify, sortBy } from '../utils/helpers';
import Voter from './voter';




class PostList extends Component {

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

	render(){
		let posts = sortBy(this.props.posts, this.state.sorter.value);
		return (
			<section className="post-list">
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
					<span>in {a.category} by {a.author}</span>
					<p> Popularity <span className="popularity-score">({a.voteScore})</span> / Comments ({a.commentCount}) </p>
					<Voter id={a.id} category={a.category} /></li>

				))	
			}
			</ul>
			<div>
				<Link to={'/post/new'}> New Post </Link>
			</div>
			</section>
		)
	}
}

function mapStateToProps({posts}, ownProps){
	return ownProps.cats === 'all' 
		? {posts: sortBy(arrayify(posts), 'voteScore')}
		: {posts: sortBy(posts[ownProps.cats], 'voteScore')}

}

function mapDispatchToProps(){
	return {}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps)(PostList));