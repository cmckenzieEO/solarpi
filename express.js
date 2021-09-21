var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})
app.get('/dash', (req,res) => {
	//res.sendFile('')
});

app.use('/dashboard', express.static('public'))



// tutorial big nerd ranch 













var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
