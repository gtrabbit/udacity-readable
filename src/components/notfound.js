import React from 'react';
import wasteland from '../style/imgs/404.jpg';
import { Link } from 'react-router-dom';


const NotFound = ()=>{
	return (
		<section className="v-align not-found">
			<img src={wasteland} alt="the wasteland"/>
			<p> We're having a hard time finding the requested post.
				If you aren't re-directed soon, try browsing by category
				or returning <Link to='/'> Home </Link> 
			</p>
		</section>
		)
}

export default NotFound;