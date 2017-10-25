import React, { Component } from 'react';
import {Link} from 'react-router-dom';



class PostList extends Component {


	state = {
		posts: this.sortBy(this.props.posts, 'voteScore')
	}

	sortBy(arr, value){
		return arr.sort((a,b)=>(
			b[value] - a[value]))
	}

	render(){

		return (
			<ul>
			{
			this.props.posts.map(a=>(
				<li key={a.id}>
					<Link to={'posts/' + a.id}> {a.title} </Link>
					in {a.category} by {a.author} ({a.voteScore})</li>
				))	
			}
			</ul>
		)
	}
}

export default PostList;