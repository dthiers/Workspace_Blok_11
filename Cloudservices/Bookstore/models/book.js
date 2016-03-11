function init(mongoose){
	console.log('Iniializing books schema');

	/*
	TODO: Validation
	- Title: Verplicht, String
	- PublishDate: Verplicht, Date, voor vandaag
	- Category: Verplicht, String
	- Chapters: Array van JSNON { title, numberOfPages }
	*/

	/*
	TODO: 
	- De benodigde virtuals (Onder andere totalNumberOfPages, opgebouwd uit numberOfPages van chapters)
	- De benodigde extra validation
	- De benodigde static methods
	- De benodigde instance methods
	*/
}

module.exports = init;