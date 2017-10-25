import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

class Header extends Component{

	render(){

		return (
				<header>
					<nav>
						<NavLink exact to="/"> Home </NavLink>
						{
							this.props.cats.map(a=>(
								<NavLink key={a} exact to={"/cats/"+a}> {a[0].toUpperCase() + a.slice(1)} </NavLink>
								))
						}
					</nav>
				</header>
			)

	}


}


export default Header;