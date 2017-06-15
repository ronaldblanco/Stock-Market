'use strict';

//GLOBALS
var numClients = 0;
var ope = '';
var temp = {};
var dataG = [];
var labelsG = [];
var label = '';
var color = undefined;
////////////////
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var config = {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: []
            },
            options: {
                responsive: true,
                title:{
                    display:true,
                    text:'Chart.js Line Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        }
        
var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var randomScalingFactorNew = function(num) {
	return Math.round((num/*/1000) * 100*/));
};


var Users = require('../models/users.js');
var traderjs = require('traderjs');
//WEBSOCKET
//var io = require('socket.io')();
//var iosa = io.of('/');
/////////////
var stockG = '';
//io.on('connection', function(){ console.log('socked.io->connected') });

function PublicHandler () {
	
	this.getTrader = function (req, res) {
		
    		/*iosa.on('connection', function(socket){  
    			console.log('Connected to Trader');
			});*/
			//iosa.emit('data', { data: config });  
    		
        	res.send(config);
		
	};
	
	this.returnTrader = function () {
		
    		return config;
		
	};
	
	this.addTrader = function (req, res) {
		var stock = req.originalUrl.toString().split("/api/:id/traderadd/")[1];//.split("_");
		if(stock == null || stock == '') stock = 'GOOG';
		stockG = stock;
		//console.log(stock);
		var configuration = {
    		//symbol: 'NASD',
    		symbol: 'NASD:'+stock,
    		interval: 86400,
    		//interval: 345600,
    		//interval: 2592000,
    		period: '30d',
    		fields: ['d','o','c','l','h','v']
		};
		traderjs
    		.config(configuration)
    		.transformer('json') // Converts the data to JSON 
    		.temporal(function(data) {
    		//console.log(data);
    		
    		
    		
    		
    		
    		
    		//console.log(config);
      var traderObject = data;
      label = stock;
      dataG = [];
      labelsG = [];
      for(var a = 0; a < traderObject.length; a++){
         
         dataG.push(parseFloat(traderObject[a].close)-parseFloat(traderObject[a].open));
         labelsG.push(new Date(parseInt(traderObject[a].date)).toDateString());
      }
      //console.log(labelsG);
      if(label === '') label = 'GOOG';
      if(color === undefined) color = chartColors.red;
      
      var colorNames = Object.keys(chartColors);
      var colorName = colorNames[config.data.datasets.length % colorNames.length];
            var newColor = chartColors[colorName];
            
            if(dataG.length > 0){
            	
            	temp = {
                    label: label,
                    backgroundColor: newColor,
                    borderColor: newColor,
                    data: [],
                    fill: false,
                }
               //console.log(temp); 
            }
    		
    		
    		
    		
    		var newdata = [];
                for(var b = 0; b < dataG.length; b++){
        			newdata.push(/*randomScalingFactorNew(*/dataG[b]/*)*/);
    			}
    			temp.data = newdata;
    			//console.log(temp);
    			config.data.datasets.push(temp);
    			config.data.labels = labelsG;
    		
    		//console.log(config);
    		
        	res.send(config);
		});
    		
	};
	
	this.delTrader = function (req, res) {
		var count = config.data.datasets.length;
		config.data.datasets.splice(count - 1, 1);
        res.send(config);
	
	};
	
	/*this.webSocket = function(socket){
	    
	    
	    socket.on('event', function(data) {
        console.log('A client sent us this message:', data.message);
        if(data.message == 'I did add a stock to the chart!') io.emit('broadcast', 'A new Stock was Add by a Client, please update the chart!');
        else if(data.message == 'I did remove a stock from the chart!') io.emit('broadcast', 'A Stock was remove by a Client, please update the chart!');
    });
	//console.log('socked.io->New Client Connected');
	//socket.emit('announcements', { message: 'A new user has joined!' });
	
	numClients++;
    io.emit('stats', { numClients: numClients });

    console.log('Connected clients:', numClients);

    socket.on('disconnect', function() {
        numClients--;
        io.emit('stats', { numClients: numClients });

        console.log('Connected clients:', numClients);
    });
	    
	    
	    // this function expects a socket_io connection as argument

        // now we can do whatever we want:
        //socket_io.on('news',function(newsreel){

        // as is proper, protocol logic like
        // this belongs in a controller:

            //socket_io.broadcast.emit(newsreel);
        //});
	};*/

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
