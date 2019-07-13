if(process.env.NODE_ENV==='production'){
    module.exports=require('./prodconfig');
}
else{
    module.exports=require('./devconfig');
}
