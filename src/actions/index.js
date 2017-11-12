import * as C from './actiontypes'

//async action handlers followed by their sync resulting calls


export const headers = {headers: {'Authorization': 'sparkle-cat-server2',
							'Content-Type': 'application/json'}}
export const baseUrl = 'http://localhost:3001/';

//==================================================//
//***************Category Actions*******************//
//==================================================//


//-----------------
export function setCategories(cats){
	return {
		type: C.SET_CATEGORIES,
		cats
	}
}


export function getCategories(){
	const url = baseUrl + 'categories'
	return (dispatch)=>{
		return fetch(url, headers).then(res=>(res.json())).then(
			res=> dispatch(setCategories(res.categories)),
			err=> console.log(err)
			)
	}
}





