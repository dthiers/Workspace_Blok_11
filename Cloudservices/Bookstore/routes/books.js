var express = require('express');
var router = express();
var Book;
var Author;
var _ = require('underscore');
var handleError;
var async = require('async');

/*
	TODO:
	- QueryString filter: topCategories={nummer}
		Tel alle boeken in een categorie
		Order deze categorie van meeste naar minste boeken
		Geef alleen de boeken terug die in de top {nummer} categorieën voorkomen
		(For now: Een boek kan maar 1 categorie hebben)

	// Ten slotte, een moeilijkere (door Async methodes)
	- Population: Vul alle autors van het boek
*/
function getBooks(req, res){
	var query = {};
	if(req.params.id){
		query._id = req.params.id.toLowerCase();
	}

	if(req.params.id){
		data = data[0];
	}
	res.json(data);
}

// Routing
router.route('/')
	.get(getBooks);

router.route('/:id')
	.get(getBooks);

// Export
module.exports = function (mongoose, errCallback){
	console.log('Initializing books routing module');
	Book = mongoose.model('Book');
	Author = mongoose.model('Author');
	handleError = errCallback;
	return router;
};