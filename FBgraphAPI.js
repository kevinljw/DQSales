var msgArray = [];
var MaxChar = 600;
var defaultUrl = '/feed';
var pageId = '725926024200300';
var getItemRe =/\[I\]\s*(\S+)\s/;
var getPriceRe =/\[P\]\s*(\S+)\s/;
var getAccountRe =/\[A\]\s*(\S+)/;
var itemStack = [];
window.fbAsyncInit = function() {
        FB.init({
          appId      : '1452922868355265',
          xfbml      : true,
          version    : 'v2.2'
        });
     
    
        var msgCount;
        ShowContent(pageId+defaultUrl); 

};

(function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk')
);


function ShowContent(targetURL){
            FB.api(targetURL,{access_token : "1452922868355265|G8GIKRZE9P_6HGnNM5qIDGC5B2I"}, function(response) {
            
            console.log(response);
            msgCount = 0;
            
             
                
            response.data.forEach(function(AElement){
                
                
                
                if(typeof(AElement.message) != "undefined"){
                    
                var onePost=AElement.message;
                var thisItemMatch=onePost.match(getItemRe); 
                    var thisPriceMatch=onePost.match(getPriceRe); 
                    var thisAccountMatch=onePost.match(getAccountRe); 
                    
                var thisEntity={
                    "Name": thisItemMatch[1],
                    "Price": thisPriceMatch[1],
                    "Account": thisAccountMatch[1],
                    "Pic": AElement.picture
                    
                  };
                    
                itemStack.push(thisEntity);
                    
//                var Iindexof=AElement.message.indexOf("[I]")+4;
//                var Pindexof=AElement.message.indexOf("[P]")+4;
//                var Aindexof=AElement.message.indexOf("[A]")+4;
//                    
//                if(Iindexof>-1){
//                   var salesProduct=onePost.slice(Iindexof,onePost.substr(Iindexof).indexOf("\r")); 
//                    console.log(onePost.substr(Iindexof).indexOf("\r"));
////                    console.log(salesProduct);
//                    
//                }
                    document.getElementById("bcont").innerHTML+="<tr onclick=\"display('"+thisAccountMatch[1].trim()+"')\"><th>"+thisItemMatch[1]+"</th><th>"+thisPriceMatch[1]+"</th><th>"+thisAccountMatch[1]+"</th></tr>";
                        
                }
                
            });
//                console.log(itemStack);
//           var testId='123217126332221';
//                var newOne=getFromId(testId);
//                console.log(newOne.Name);
            
        });
}
function getFromId(thisId){
    var newEntity;
    itemStack.some(function(AElement){
        if(AElement.Account==thisId){
//            console.log("t");
             newEntity={
                "Name": AElement.Name,
                    "Price": AElement.Price,
                    "Pic": AElement.Pic
             }
            return true;
        }
    });
     return newEntity;
   
}
