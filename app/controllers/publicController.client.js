'use strict';

var dataG = [];
var label = '';
var color = undefined;

var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var config = {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
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
                }]
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
                            labelString: 'Month'
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
	return Math.round((num/1000) * 100);
};

   var addButton = document.querySelector('#addDataset');
   var deleteButton = document.querySelector('#removeDataset');
   var stock = document.querySelector('#stock');
   var apiUrl = appUrl + '/api/:id/trader';

   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }
   
   function updateTrader (data) {
      console.log(config);
      var traderObject = JSON.parse(data);
      //var traderObject = data;
      //console.log(traderObject);
      dataG = [];
      for(var a = 0; a < traderObject.length; a++){
         dataG.push(parseFloat(traderObject[a].high));
      }
      console.log(data);
      if(label === '') label = 'GOOG';
      if(color === undefined) color = window.chartColors.red;
   }
   
   function noUpdateTrader (data) {
      
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateTrader));

   addButton.addEventListener('click', function () {
       
    var stock = document.querySelector('input[id = "stock"]').value;//{'user': user.github.id,'poll':poll}
    label = stock;
      ajaxFunctions.ajaxRequest('GET', apiUrl+'add/'+stock, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateTrader);
      });

   }, false);

   /*deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);*/

})();
