var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    user:'vishnuajay',
    database:'vishnuajay',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var pool=new Pool(config);
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/aboutme', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
function createTemplate(data){
    var title=data.title;
    var articleheading=data.articleheading;
    var images=data.images;
    var content=data.content;
    var htmlTemplate=` <html>
    <head>
    <title>${title}</title>
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <img class="img1" src="head.jpg">
<ul>
<li><a href="#home">HOME</a></li>
  <li><a class="active" href="#Blog">BLOG</a></li>
  <li><a href="#destinations">DESTINATIONS</a></li>
  <li><a href="#photo">PHOTOGRAPHY</a></li>
  <li><a href="#video">VIDEOS</a></li>
  <li><a href="#about">ABOUT ME</a></li>
</ul>
<div class="div1">${articleheading}</div>
<div class="slideshow-container">${images}</div>
<br>
<div style="text-align:center">
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>
<div class="div2">${content}</div>
<div class="div3">
<h1> Leave a Comment</h1>

<textarea style="background-color: lightyellow" placeholder="Leave a Comment..." rows="7" cols="70">
</textarea><p></p>
<input type="text" style="background-color: lightyellow"placeholder="Name"><p></p>
<input type="text" style="background-color: lightyellow"placeholder="Email"><p></p>
<input type="submit" value="Post My Comment">
</div>
<script>
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000);
}
</script>
    
    </body>
    </html>`
    ;
  return htmlTemplate;  
}
app.get('/articles/:articleName',function(req,res){
    pool.query("SELECT * FROM article where title=$1",[req.params.articleName],function(err,result){
        if(err){
        res.status(500).send(err,toString());    
        }else{
          if(result.rows.length==0){
              res.status(404).send("article not found");
          }  else{
              var articleData=result.rows[0];
              res.send(createTemplate(articleData));
          }
        }
    });
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
