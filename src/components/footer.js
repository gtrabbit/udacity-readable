import { NavLink } from 'react-router-dom';
import React from 'react';

const Footer = (props)=>{

	return (
		<nav>
			<NavLink exact to="/"> Home </NavLink>
			{
			props.cats.map(a=>(
				<NavLink key={a} exact to={"/cats/"+a}> {a[0].toUpperCase() + a.slice(1)} </NavLink>
			))
			}
			<p className="about"> Single-page application with React-Redux by<a rel="noopener noreferrer" target="_blank" href="http://chrisrune.com/">Chris Rune</a> </p>
		</nav>

				
	)



}


export default Footer;