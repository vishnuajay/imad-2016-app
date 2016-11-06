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
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=` <html>
    <head>
    <title>${title}</title>
    </head>
    <body>
    <h1>${heading}</h1>
    <div>${content}</div>
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
