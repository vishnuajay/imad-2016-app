console.log('Loaded!');
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    
var request=new XMLHttpRequest();
request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
        if(request.status===200){
            var names=request.responseText;
            names=JSON.parse(names);
            var list="";
            for(var i=0;i<names.length;i++){
                list+='<tr><td>'+names[i]+'</td></tr>'+'</hr>';
            }
            var ul=document.getElementById('comment_list');
            ul.innerHTML=list;
        }
    }
};
var nameInput=document.getElementById('comment_box');
var name=nameInput.value;
request.open('GET','http://vishnuajay.imad.hasura-app.io/submit-name?name='+name,true);
request.send(null);
};
 
    var login = document.getElementById('login_btn');
    login.onclick = function () {
        var request = new XMLHttpRequest();
    
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
            
              if (request.status === 200) {
                  alert("login sucessfully");
              } else if (request.status === 403) {
                  login.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  login.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  login.value = 'Login';
              }
    }
};
var username = document.getElementById('uname').value;
        var password = document.getElementById('pass').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
