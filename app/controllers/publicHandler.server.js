'use strict';

var Users = require('../models/users.js');
var traderjs = require('traderjs');
var stockG = '';

function PublicHandler () {
	
	this.getNothing = function (req, res) {
	
        	res.send({});
	
	};
	
	this.getTrader = function (req, res) {
		var stock = '';
		if(stockG == '') stock = 'GOOG';
		else stock = stockG;
		var configuration = {
    		//symbol: 'NASD',
    		symbol: 'NASD:'+stock,
    		//interval: 86400,
    		interval: 345600,
    		period: '365d',
    		fields: ['d','o','c','l','h','v']
		};
		traderjs
    		.config(configuration)
    		.transformer('json') // Converts the data to JSON 
    		.temporal(function(data) {
    		//console.log(data);
        	res.send(data);
		});
    		
	};
	
	this.addTrader = function (req, res) {
		var stock = req.originalUrl.toString().split("/api/:id/traderadd/")[1];//.split("_");
		if(stock == null || stock == '') stock = 'GOOG';
		stockG = stock;
		console.log(stock);
		var configuration = {
    		//symbol: 'NASD',
    		symbol: 'NASD:'+stock,
    		//interval: 86400,
    		//interval: 345600,
    		interval: 2592000,
    		period: '365d',
    		fields: ['d','o','c','l','h','v']
		};
		traderjs
    		.config(configuration)
    		.transformer('json') // Converts the data to JSON 
    		.temporal(function(data) {
    		console.log(data);
        	res.send(data);
		});
    		
	};

	/*this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};*/

	/*this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};*/

	/*this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};*/

}

module.exports = PublicHandler;
