const app= require('./app');
const puerto =app.get('port');

app.listen (puerto,()=>{
    console.log('Server on port',puerto);
}); 
 