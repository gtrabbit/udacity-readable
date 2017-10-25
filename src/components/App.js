import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from './header';
import Footer from './footer';
import PostList from './postlist';
import { getInitialPosts } from '../actions';
import '../App.css';


class App extends Component {

  cats = ['react', 'redux', 'udacity'];


  componentDidMount(){
    if (this.props.allPosts.length){
      return 
    } else {
      this.props.getInitialPosts();
    }
  }


  render() {
    const { allPosts } = this.props
    return (
    	<div>
    	<Route 				//HEADER
    		path="*"
    		render={(route)=>{
    			return (
    				<Header route={route} cats={this.cats}/>
    				)
    		}}
    		   	/>

      <Route 
      	exact path="/"
      	render={(route)=>{

	      	return (
           <div>
          { allPosts.length && <PostList posts={allPosts} />}
	      
            </div>
	      		)
	      	}}
      />

      <Route 
      	path="/cats/:cat"  // category view
      	render={(route)=>{
      		return (
            <div>
	      		{allPosts && <PostList posts={allPosts.filter(
              a=>a.category===route.match.params.cat)} />}
      			</div>
            )


      		}}
      />

      <Route
      	path="/new/:type"
      	render={()=>(
      		<h1> Edit </h1>
      		)}
      />

      <Route 
      	path="/posts/:id"
      	render={()=>(
      		<h1> Posts </h1>
      		)}
      />

    	<Route       			//FOOTER
    		path="*"
    		render={(route)=>{
    			return (
            <Footer route={route} cats={this.cats} />
    				)}}
    		   	/>
 			</div>
    );
  }
}


function mapStateToProps({comments, posts}){
  let allPosts = [];
  for (let key in posts){
    posts[key].forEach(a=>{
      allPosts.push(a);
    })
  }
	return {
		comments, allPosts
	}
}

function mapDispatchToProps(dispatch){
	return {
		getInitialPosts: () => dispatch(getInitialPosts())
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps)(App))