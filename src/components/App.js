import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from './header';
import Footer from './footer';
import PostList from './postlist';
import PostPage from './postpage';
import CommentList from './commentslist';
import PostForm from './postform'
import { getInitialPosts, getCategories } from '../actions';
import '../style/css/style.css';


class App extends Component {


  componentWillMount(){
    if (!this.props.allPosts.hasOwnProperty('react')){
      this.props.getCats();
      this.props.getInitialPosts();
    }
  }


  render() {
    const { allPosts } = this.props
    return (
    	<div>
      
    	<Route 				//HEADER
    		path="*"
    		render={()=>{
    			return (
            <header className="header">
    				{this.props.categories.length && <Header cats={this.props.categories.map(a=>a.name)}/>}
            </header>
    				)
    		}}
    		   	/>
      
      <Route 
      	exact path="/"
      	render={()=>{

	      	return (
           <main>
          { allPosts.hasOwnProperty('react') && <PostList cats={"all"} /> }
	      
            </main>
	      		)
	      	}}
      />

      <Route 
      	exact path="/:cat"  // category view
      	render={(route)=>{
      		return (
            <main>
	      		{allPosts.hasOwnProperty('react') && <PostList cats={route.match.params.cat} />}
      			</main>
            )


      		}}
      />
      <Switch>
      <Route
      	exact path="/post/:type"
      	render={(route)=>(
          <main>
      		  <PostForm route={route} />
          </main>
      		)}
      />

      <Route 
      	exact path="/:cat/:id"
      	render={(route)=>{
          return (
            <main>
            
              {allPosts.hasOwnProperty('react') && 
                <section>
                  <PostPage 
                    cat={route.match.params.cat}
                    postId={route.match.params.id}
                    route={route} />
                  <CommentList postId={route.match.params.id} />
                </section>}

            </main>
          )

        }
      		
      		}
      />
      </Switch>
    	<Route       			//FOOTER
    		path="*"
    		render={()=>{
    			return (
            <footer className="footer">
              {this.props.categories.length && <Footer cats={this.props.categories.map(a=>a.name)}/>}
            </footer>
    				)}}
    		   	/>
      
 			</div>
    );
  }
}


function mapStateToProps({comments, posts, categories}){
  let allPosts = posts;
	return {
		comments, allPosts, categories
	}
}

function mapDispatchToProps(dispatch){
	return {
		getInitialPosts: () => dispatch(getInitialPosts()),
    getCats: () => dispatch(getCategories())
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps)(App))