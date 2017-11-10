export function arrayify(postsObj){
		const allPosts = [];
		Object.keys(postsObj).forEach(a=>{
			postsObj[a].forEach(b=>{
				allPosts.push(b);
			})
		})
		return allPosts;
	}

export function sortBy(arr, value){
	switch(value){
		case 'author':
			return arr.sort((a,b)=>(
				a.author.toLowerCase() > b.author.toLowerCase()
					? 1
					: -1
				))
		default:
			return arr.sort((a,b)=>(
				b[value] - a[value]))
	}
	}

export const dateOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }