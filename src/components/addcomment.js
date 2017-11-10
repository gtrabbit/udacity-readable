import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './commentform';

class AddComment extends Component {


	state = {
		showForm: false
	}

	toggleShowForm = ()=>{
		this.setState(state=>({showForm: !state.showForm}))
	}

	render(){
		return (
			<div  className="add-comment">
				<button className="add-comment-button" onClick={this.toggleShowForm}> 
				
					{this.state.showForm
						? 'Discard Draft'
						: 'Add Comment'}

				</button>
				{this.state.showForm 
					&&	<CommentForm close={this.toggleShowForm} parentId={this.props.parentId} />}	
				
			</div>
			)	
	}
}



export default connect()(AddComment);