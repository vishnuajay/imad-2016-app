console.log('Loaded!');

 function loadLoginForm (){
var loginHtml =     `
        <div class="div4">Login</div>
<p></p>
<form>
  <input type="text" id="uname" name="uname" placeholder="username"><p></p>
<input type="password" id="pass" name="pass" placeholder="password">
</form>
<p></p>
<button class="button4 button5" id="login_btn">Login</button>
<p></p>
<div class="div5">
<a href="http://vishnuajay.imad.hasura-app.io/registration">create an account</a><p></p>
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
                  login.value = 'Invalid credentials. Try again?';
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
var username = document.getElementById('uname').value;
        var password = document.getElementById('pass').value;
        console.log(username);
        console.log(password);
        request.open('POST', 'http://vishnuajay.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password})); 
        
    };
    
     var register = document.getElementById('reg_btn');
    register.onclick =function () {
        var request = new XMLHttpRequest();
        
        request.onreadystatechange =function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        var username = document.getElementById('runame').value;
        var password = document.getElementById('rpass').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
 }

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('div2');
    loginArea.innerHTML = `
    <div class="div17">
        <h3> Hi <i>${username}</i></h3><p></p>
        <h4>you are logged in sucessfully.....</h4>
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
                alert("please login");
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}