import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

class Footer extends Component{

	render(){

		return (
				<footer>
					<nav>
						<NavLink exact to="/"> Home </NavLink>
						{
							this.props.cats.map(a=>(
								<NavLink key={a} exact to={"/cats/"+a}> {a[0].toUpperCase() + a.slice(1)} </NavLink>
								))
						}
					</nav>
				</footer>
			)

	}


}


export default Footer;