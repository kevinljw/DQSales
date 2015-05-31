var msgArray = [];
var MaxChar = 600;
var defaultUrl = '/feed';
var pageId = '725926024200300';
window.fbAsyncInit = function() {
        FB.init({
          appId      : '1452922868355265',
          xfbml      : true,
          version    : 'v2.2'
        });
     
    
        var msgCount;
        ShowArticles(pageId+defaultUrl); 

};

(function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk')
);


function ShowArticles(targetURL){
            FB.api(targetURL,{access_token : "1452922868355265|G8GIKRZE9P_6HGnNM5qIDGC5B2I"}, function(response) {
            console.log(response);
            msgCount = 0;
            response.data.forEach(function(AElement){
                
                if(typeof(AElement.message) != "undefined"){
                        document.getElementById("bcont").innerHTML+=AElement.message;
                        
                }
                
            });
            
            
        });
}