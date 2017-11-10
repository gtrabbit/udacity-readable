import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votePostOnServer } from '../actions'
import ThumbsUp from 'react-icons/lib/ti/thumbs-up';
import ThumbsDown from 'react-icons/lib/ti/thumbs-down';

class Voter extends Component {

	state={
		voted: false
	}

	voteUp = ()=>{
		this.setState({voted: true});
		this.props.voteUp(this.props.id, this.props.category);
	}

	voteDown = ()=>{
		this.setState({voted: true});
		this.props.voteDown(this.props.id, this.props.category);
	}

	render(){
		return (
			<span className="vote-buttons">
				<button onClick={this.voteUp} disabled={this.state.voted}> <ThumbsUp /> </button>
				<button onClick={this.voteDown} disabled={this.state.voted}> <ThumbsDown /> </button>
			</span>
			)
	}
}

function mapStateToProps({posts}, ownProps){
	return {id: ownProps.id}
}

function mapDispatchToProps(dispatch){
	return {
		voteUp: (id, cat)=>dispatch(votePostOnServer(id, 'upVote', cat)),
		voteDown: (id, cat)=>dispatch(votePostOnServer(id, 'downVote', cat)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(Voter)