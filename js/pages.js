function init(){
   var cookieValue = readCookie("token");
	if(cookieValue!=null){
        document.getElementById("loginRegisterDiv").style.display='none';
		document.getElementById("productsDiv").style.display='block';
		document.getElementById("infoDiv").style.display='block';
        _diqi.token=cookieValue;
        diqiGetPrimaryAddress(function(addr, bal) {
        bal.balance;
        document.getElementById("balanceText").innerHTML="YOUR CURRENT ACORN<br><div class=\"balShow\">"+bal.balance+"</div>";
        });
        
//        bal.balance
	}

	
}
    function display(id){
        console.log(id);
        document.getElementById("productsDiv").style.display='none';
        document.getElementById("productDetailDiv").style.display='block';
        var infoArray=getFromId(id);
          console.log(getFromId(id));
        document.getElementById("productName").innerHTML = infoArray.Name;
        document.getElementById("productPrice").innerHTML = infoArray.Price;
        document.getElementById("productPicture").src = infoArray.Pic;
        document.getElementById("productId").innerHTML = id;
        
    }
    function purchase(){
        console.log("hllo "+document.getElementById("productId").innerHTML);
        diqiGetBalance(document.getElementById("productId").innerHTML,function(add,bal){
            console.log("rein"+bal);
        if(bal.balance>0){
            alert("Item has been sold");
            
        }else{
        diqiPay(document.getElementById("productId").innerHTML,document.getElementById("productPrice").innerHTML.replace("$",""),function(){
        alert("Success");
        location.reload();
        },function(){alert("Failure");
        location.reload();});
        }
        });
        
        
        
        
    }
function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
	
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}
function Login() {
    document.getElementById("loginRegisterDiv").style.display='none';
	document.getElementById("loginDiv").style.display='block';
	
}
function diqiLogin2() {
  document.getElementById("loginDiv").style.display='none';
  var Passt = document.getElementById('pass');
        var Name = document.getElementById('account');
        var userPass = Passt.value;
        var userName = Name.value;
  
  diqiLogin(userName,userPass, function() {
  createCookie("token",_diqi.token,90);
  document.getElementById("productsDiv").style.display='block';
  document.getElementById("infoDiv").style.display='block';
  });
  
}

function getBalance(){
	document.getElementById("productsDiv").style.display='none';
	document.getElementById("balanceDiv").style.display='block';
    document.getElementById("productDetailDiv").style.display='none';
    document.getElementById("sellDiv").style.display='none';
    diqiGetPrimaryAddress(function(addr, bal) {
        bal.balance;
        document.getElementById("balanceText").innerHTML="Your current Acorn balance is:"+bal.balance;
    });
	
}

function showProducts(){
	document.getElementById("productsDiv").style.display='block';
	document.getElementById("balanceDiv").style.display='none';
    document.getElementById("productDetailDiv").style.display='none';
    document.getElementById("sellDiv").style.display='none';
	
}
    function sell(){
        document.getElementById("productsDiv").style.display='none';
	document.getElementById("balanceDiv").style.display='none';
    document.getElementById("productDetailDiv").style.display='none';
        document.getElementById("sellDiv").style.display='block';
    }
    function sellDisplay(){
        document.getElementById("productsDiv").style.display='none';
	document.getElementById("balanceDiv").style.display='none';
    document.getElementById("productDetailDiv").style.display='none';
        document.getElementById("sellDiv").style.display='block';
        diqiCreateAddress(function(add){
        document.getElementById("sellText").innerHTML="[I] "+document.getElementById("productNameSell").value+"\n[P] "+document.getElementById("productPriceSell").value+"\n[A] "+add;
        });
        Copied = document.getElementById("sellText").createTextRange();
        Copied.execCommand("Copy");

    }

