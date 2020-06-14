const express = require('express');
const port = 8000;
const app = express();

//setting up view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');


//using router
app.use('/',require('./routes/index.js'));

//using static files
app.use(express.static('./assets'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in running server');
        return;
    }
    console.log('Server is running and up at port ',port);
    return;
});