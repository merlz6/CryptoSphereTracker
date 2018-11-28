const app = angular.module('cryptoTracker', []);

app.controller('CryptoTrackerController', ['$http', function($http){


  /*********     Partials      ********/
  this.includePath = './partials/home.html';
  this.changeInclude = (path) => {
  this.includePath = './partials/'+ path +'.html';
  }
const controller = this;
this.username = '';
  this.password ='';



  this.createUser = function(){
  $http({
      method:'POST',
      url:'/',
      data: {
          username: this.username,
          password: this.password
      }
  }).then(function(response){
      console.log(response);
      controller.includePath = './partials/home.html';
      controller.username= "";
      controller.password= "";
    })
  }




  /*********     getQuotes      ********/
this.quotesData = []
  this.getQuotes = function(){
    $http({
      method:'GET',
      url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,XRP,LTC,BCH,EOS,XLM,XMR,ADA,TRX&tsyms=USD,BTC"
    }).then(function(response){
      // console.log(response.data);
      controller.quotesData = response.data

    }, error=>{
            console.log(error);
        })
    };


      /*********     get NEWs      ********/
    this.newsData = []
    this.getNews = function(){
      $http({
        method:'GET',
        url: "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
      }).then(function(response){
        // console.log(response.data);
        controller.newsData = response.data

      }, error=>{
              console.log(error);
          })
      };




    this.getQuotes()
    this.getNews()
}]);
