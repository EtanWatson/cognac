var express = require('express'),
    rewrite = require('express-urlrewrite'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    WebpackConfig = require('./webpack.config');

var app = express();
app.use(webpackDevMiddleware(webpack(WebpackConfig),{
    publicPath:'/_bulid_/',
    stats:{
     colors:true
    }
}));

var fs = require('fs'),
    path = require('path');

//fs.readdirSync(__dirname).forEach(function(file){
//    if(fs.statSync(path.join(__dirname,file)).isDirectory()&& file==="public"){
//        console.log(file);
//        app.use(rewrite('/'+file+'/*','/'+file+'/index.html'))
//    }
//});
app.use(rewrite("/public/*","/public/index.html"));
app.use(express.static(__dirname+"/public/"));

app.listen(8080,function(){
    console.log('Server listening on http://localhost:8080, Ctrl+C to stop');
});

