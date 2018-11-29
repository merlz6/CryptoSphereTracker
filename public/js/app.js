const app = angular.module('cryptoTracker', []);

app.controller('CryptoTrackerController', ['$http', function($http){


  /*********     Partials      ********/
  this.includePath = './partials/login.html';
  this.changeInclude = (path) => {
  this.includePath = './partials/'+ path +'.html';
  }

  /*********         ********/
  const controller = this;
  this.username = '';
  this.password ='';
  this.showWhenLoggedIn = false;
  this.balance = this.balance;
  this.toggleWhenUserIsLoggedIn = function(){
      this.showWhenLoggedIn = !this.showWhenLoggedIn;
  };



/*********     Create User function      ********/
  this.createUser = function(){
  $http({
      method:'POST',
      url:'/cryptos',
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

  /*********     Login function      ********/
    this.logIn = function(){
          $http({
              method:'POST',
              url:'/sessions',
              data: {
                  username:this.username,
                  password:this.password
              }
          }).then(function(response){
              controller.userBalance = response.data;
              console.log(controller.userBalance)
              controller.includePath = './partials/home.html';
              controller.toggleWhenUserIsLoggedIn();
          })
      }

    /*********     Logout function      ********/
    this.logout = function(){
          this.username = "";
          this.password = "";
          controller.toggleWhenUserIsLoggedIn();

        };


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

    this.quoteData = {}
      this.getQuote = function(key){
        $http({
          method:'GET',
          url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + key  +"&tsyms=USD,BTC"
        }).then(function(response){
          console.log(response.data);
          // controller.quoteData = response.data

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

      /*********    Update route      ********/
  this.editCrypto = function(user){
    $http({
      method: 'PUT',
      url: '/crypto/' + user._id,
      data: {
        balances:{
        balanceBTC:this.balanceBTC,
        balanceLTC:this.balanceLTC,
        balanceXRP:this.balanceXRP,
        balanceETH:this.balanceETH,
        balanceXLM:this.balanceXLM,
        balanceXMR:this.balanceXMR,
        balanceADA:this.balanceADA,
        balanceTRX:this.balanceTRX,
        balanceEOS:this.balanceEOS,
        balanceBCH:this.balanceBCH,
        }
      }
    }).then(function(response){
      console.log(response);
      controller.includePath = './partials/home.html';

    }, error => {
      console.log(error);
    })
  };










    this.getQuotes()
    this.getNews()
}]);
