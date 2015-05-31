var msgArray = [];
var MaxChar = 600;
var defaultUrl = '/feed?limit=5&fields=message,created_time,picture';
var pageId = '1404286799873234';
window.fbAsyncInit = function() {
        var NewsFromUrl = 'https://www.facebook.com/HarvardTaiwanx'
        FB.init({
          appId      : '648081398630920',
          xfbml      : true,
          version    : 'v2.2'
        });
     
        //1494299877520331
        //1404286799873234
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
function toggleText(id, IsMore, index){
    console.log(id);
    if(IsMore){
document.getElementById(id.toString()).innerHTML=msgArray[index].substr(0,MaxChar)+'<a onclick=\"toggleText(\''+id+'\', false,'+index+' );\" href=\"javascript:void(0);\"> ...(See More)</a>';
    }
    else{
        document.getElementById(id.toString()).innerHTML=msgArray[index]+'<a onclick=\"toggleText(\''+id+'\', true,'+index+' );\" href=\"javascript:void(0);\"> ...(See Less)</a>';
    }

}


function ShowArticles(targetURL){
            FB.api(targetURL,{access_token : "648081398630920|444596d0e77980840ce45af4e651022b"}, function(response) {
//            console.log(response);
            msgCount = 0;
            response.data.forEach(function(AElement){
                
                
                if(typeof(AElement.message) != "undefined"){
                    
                    var title = 'News';
                    var msg = AElement.message;
                    if(AElement.message.indexOf('【')>-1){
                        title = AElement.message.slice(AElement.message.indexOf('【')+1, AElement.message.indexOf('】'));
                        msg = msg.substr(AElement.message.indexOf('】')+2);
                        
                    }
                    if(msg.length>MaxChar){
                        msgArray.push(msg);
                        msgCount++;
                    }
                    document.getElementById("bcont").innerHTML+='<article  class= \"post\" > <div class=\"dets_wrap\">   <div class=\"dets\">    <h2>'+title+'</h2>  <ul>        <li>	'+moment(AElement.created_time).parseZone().utcOffset(8).format('LLL')+'</li>       </ul>   </div></div>                                               <div class=\"content_wrap\"> <div class=\"aContent preParent\">                     <p>'+((AElement.hasOwnProperty('picture'))?'<img class=\"alignleft \" src=\"'+AElement.picture+'\" width="210" height="135" />':'')+'<pre class=\"newsContent\" id=\"'+AElement.id+'\">'+(msg.length>MaxChar?(msg.substr(0,MaxChar)+'<a onclick=\"toggleText(\''+AElement.id+'\', false,'+(msgCount-1)+' );\" href=\"javascript:void(0);\"> ...(READ MORE)</a>'):msg)+'</pre></div>   </div>  </article>                                                                        <div class=\"clear\"></div>';
            
                }
                
            });
            if(response.hasOwnProperty('paging')){
                    if(response.paging.hasOwnProperty('next')){
                        document.getElementById("nextPaging").innerHTML='<a onclick=\"ShowArticles(\''+(response.paging.next.substr(response.paging.next.indexOf(pageId)))+'\');\" href=\"javascript:void(0);\"\'>More Page »</a>';
                }
            }
            document.getElementById("changeFoot").className="foot";
            
        });
}
