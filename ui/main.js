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
                list+='<li>'+names[i]+'</li>'
            }
            var ul=document.getElementById('comment_list');
            ul.innerHTML=list;
        }
    }
};
var nameInput=document.getElementById('comment_box');
var name=nameInput.value;
request.open('GET','http://vishnuajay.imad.hasura-app.io/submit-name?name='+names,true);
request.send(null);
};
    
