console.log('Loaded!');
function loadLoginForm (){
var loginHtml =     `
        <div class="div4">Login/Register</div>
<p></p>
<form>
<input type="text" id="username" name="username" placeholder="username">
<input type="password" id="password" name="password" placeholder="password">
</form>
<p></p>
<button class="button4 button5" id="login_btn">Login</button>
<p></p>
<p></p>
<button class="button4 button5" id="regr_btn">Register</button><p></p>
<div class="div5">
<a href="#">forgot password?</a>
</div>
        `;
    document.getElementById('div2').innerHTML = loginHtml;
    var login = document.getElementById('login_btn');
    login.onclick =function () {
        var request = new XMLHttpRequest();
    
        request.onreadystatechange =function () {
          if (request.readyState === XMLHttpRequest.DONE) {
            
              if (request.status === 200) {
                  alert("login sucessfully");
              } else if (request.status === 403) {
                  alert("enter valid username/password");
                  login_btn.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  login.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  login.value = 'Login';
              }
              loadLogin();
    }
};
var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', 'http://vishnuajay.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password})); 
        
    };
    
     var register = document.getElementById('regr_btn');
    register.onclick =function () {
        var request = new XMLHttpRequest();
        
        request.onreadystatechange =function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  if(document.getElementById('username').value!==""&&document.getElementById('password').value!==""){
                  alert('User created successfully');
                      }
                  
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        if(document.getElementById('username').value!==""&&document.getElementById('password').value!==""){
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        
        }
    
    };
 }

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('div2');
    loginArea.innerHTML = `
    <div class="div17">
        <h3> Hi <i>${username}</i></h3><p></p>
        <h4>you are logged in sucessfully.....</h4>
        <br/><br/>
        <img src="https://s-media-cache-ak0.pinimg.com/564x/4e/5c/f7/4e5cf7d4ccb9c59b6620a9c71944d51e.jpg" width="350px" height="270px">
        <br/><br/>
        <a href="/logout">Logout</a>
        </div>
    `;
}

function loadLogin () {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}
loadLogin();














var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm () {
    var commentFormHtml = `
        <div class="div30">
<h1> Leave a Comment</h1>
<textarea style="background-color: lightyellow" id="comment_text" placeholder="Leave a Comment..." rows="7" cols="70">
</textarea><p></p>
<input type="submit" id="submit_btn" value="Post My Comment">
</div>
        `;
    document.getElementById('comment_form').innerHTML = commentFormHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('submit_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Submitting...';
        
    };
}


function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            ${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} 
                        </div>
                    </div>`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}
loadComments();
loadCommentForm();