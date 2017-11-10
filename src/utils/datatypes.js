import uuid from 'uuid/v1';



export class Post {
	constructor(body, author, title, category){
		this.body = body;
		this.author = author;
		this.id = uuid();
		this.timestamp = Date.now();
		this.voteScore = 0;
		this.title = title;
		this.category = category;
	}
}


export class Comment {
	constructor(body, author, parentId){
		this.body = body;
		this.author = author;
		this.id = uuid();
		this.parentId = parentId;
		this.timestamp = Date.now();
		this.voteScore = 0;
	}
}