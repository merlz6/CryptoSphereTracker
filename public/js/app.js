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
this.userBTCvalueUSD='';
this.searchquote
// this.getPortfolioValue = function(){
//   this.userBTCvalueUSD = this.quotesData.RAW.BTC.Price
// }


/************** TOGGLE FUNCTIONS ********/


  // show and hide login and logout / portfolio page and news buttons
  this.toggleWhenUserIsLoggedIn = function(){
      this.showWhenLoggedIn = !this.showWhenLoggedIn;
  };

// need to toggle showing btc usd value on click
this.showBTCValue = false;
this.showUSDValue = !this.showBTCValue

// function to toggle between USD and BTC
this.toggleBTCValue = function(){
  this.showBTCValue = true;
  this.showUSDValue = false;
}
this.toggleUSDValue = function(){
  this.showBTCValue = false;
  this.showUSDValue = true;
}

// toggle edit form visibility
this.showEditField = false;
this.toggleEditField = function(){
  this.showEditField = !this.showEditField
}


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
          controller.includePath = './partials/login.html';
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

// on home page i want to pull more prices than the available ones to the portfolio
    this.quotesData2 = []
      this.getQuotes2 = function(){
        $http({
          method:'GET',
          url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,XRP,LTC,BCH,EOS,XLM,XMR,ADA,TRX,LINDA,TPAY,Ox,BAT,ETC,BNB,NEO,WTC,IOTA,DASH,ZEC,DOGE,DGB,ZIL,NPXS,HOT,ETN&tsyms=USD,BTC"
        }).then(function(response){
          // console.log(response.data);
          controller.quotesData2 = response.data

        }, error=>{
                console.log(error);
            })
        };



    this.quoteData = []
      this.getQuote = function(key){
        $http({
          method:'GET',
          url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + key  +"&tsyms=USD,BTC"
        }).then(function(response){
          console.log(response.data);
          controller.quoteData = response.data
          controller.includePath = './partials/show.html';
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
  this.editUserBalances = function(user){
    console.log('edit user balances is runnign')
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
      controller.includePath = './partials/portfolio.html';

    }, error => {
      console.log(error);
    })
  };

// this.colorGreen = true;
// this.quoteDataColor =[]
//   this.colorChange = function(quote){
//     $http({
//       method:'GET',
//       url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + quote  +"&tsyms=USD,BTC"
//     }).then(function(response){
//       console.log(response.data);
//       controller.quoteDataColor = response.data
//       controller.includePath = './partials/show.html';
//     }, error=>{
//             console.log(error);
//         })
//
//         if(Number(this.quoteDataColor.RAW.CHANGEPCT24HOUR) > 0)
//
//     };



this.value = 'hello'
this.test = function(){
  console.log('test')
}


    this.getQuotes()
    this.getQuotes2()
    this.getNews()
}]);
