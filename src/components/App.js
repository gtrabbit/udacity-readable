import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from './header';
import Footer from './footer';
import PostList from './postlist';
import PostPage from './postpage';
import PostForm from './postform'
import {  getCategories } from '../actions';
import '../style/css/style.css';
import { getInitialPosts } from '../actions/postactions';


class App extends Component {


  componentWillMount(){
      this.props.getCats();
  }

  render() {

    return (
    	<div>
      
    	<Route 				//HEADER
    		render={()=>{
    			return (
            <header className="header">
    				{this.props.categories.length && <Header cats={this.props.categories.map(a=>a.name)}/>}
            </header>
    				)
    		}}
    		   	/>
      



      <Switch>
        <Route 
          exact path="/:cat"  // category view
          render={(route)=>{
            return (
              <main>
              <PostList cats={route.match.params.cat} />
              </main>
              )


            }}
        />
        <Route 
        exact path="/"
        render={()=>{

          return (
           <main>
          <PostList cats={"all"} />
        
            </main>
            )
          }}
      />
      <Route
      	exact path="/post/:type/:id"
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
              <PostPage 
                    cat={route.match.params.cat}
                    postId={route.match.params.id}
                    route={route} />
            </main>
          )

        }
      		
      		}
      />

     <Route
      render = {()=>(
        <main>
          <p> We couldn't find anything matching that address.
          Try browsing via the links above.
          </p>
        </main>
        )

      }

     />
      </Switch>
    	<Route       			//FOOTER
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


function mapStateToProps({categories}, ownProps){

	return {categories}
}

function mapDispatchToProps(dispatch){
	return {
    getCats: () => dispatch(getCategories()),
    getPosts: (cat) => dispatch(getInitialPosts(cat)) 
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps)(App))