import { NavLink } from 'react-router-dom';
import React from 'react';

const Header = (props)=>{
	return (
		<div>
		<h1> Words About Stuff </h1>
		<nav>
			<NavLink exact to="/"> Home </NavLink>
				{
				props.cats.map(a=>(
					<NavLink key={a} exact to={"/"+a}> {a[0].toUpperCase() + a.slice(1)} </NavLink>
				))
				}
		</nav>		
		</div>
	)

}


export default Header;