const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.json());
require('./routes/DialogFlowRoutes')(app);

const PORT_NUMBER=process.env.PORT || 5000;



app.listen(PORT_NUMBER);
