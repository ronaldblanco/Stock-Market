'use strict';

//GLOBALS
var connected = 0;
var configFromServer = {};
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
                datasets: [/*{
                    label: "My First dataset",
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ],
                    fill: false,
                }, {
                    label: "My Second dataset",
                    fill: false,
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ],
                }*/]
            },
            options: {
                responsive: true,
                title:{
                    display:true,
                    text:'Stock Market'
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
        };



(function () {
   
   window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

window.randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};

window.randomScalingFactorNew = function(num) {
	return Math.round((num/*/1000) * 100*/));
};
    
    var update = document.querySelector('#update');
   var addButton = document.querySelector('#addDataset');
   var deleteButton = document.querySelector('#removeDataset');
   var stock = document.querySelector('#stock');
   var count = document.querySelector('#count');
   var apiUrl = appUrl + '/api/:id/trader';

   function updateTrader (data) {
      //console.log(config);
      var traderObject = JSON.parse(data);
      //var traderObject = data;
      
      configFromServer = traderObject;
      count.innerHTML = 'Connected Clients: <kbd>'+connected+'</kbd>';
      //console.log(config);
            
      //ope = 'add';
      
   }
   
   /*function updateTraderAdd (data) {
      //console.log(config);
      var traderObject = JSON.parse(data);
      //var traderObject = data;
      
      configFromServer = traderObject;
      
      //console.log(config);
            
      ope = 'add';
      
   }*/
   
   /*function updateTraderDel (data) {
      ope = 'del';
   }*/
   
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateTrader));

    update.addEventListener('click', function () {
       
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateTrader);
      
   }, false);

    addButton.addEventListener('click', function () {
       
    var stock = document.querySelector('input[id = "stock"]').value;//{'user': user.github.id,'poll':poll}
    label = stock;
      ajaxFunctions.ajaxRequest('GET', apiUrl+'add/'+stock, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateTrader);
      });

   }, false);
   
    deleteButton.addEventListener('click', function () {
       
       ajaxFunctions.ajaxRequest('GET', apiUrl+'del', function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateTrader);
      }); 

   }, false);
   
})();
