var express = require('express');
var router = express.Router();
var {
    tfind
} = require('../public/javascripts/fa');

    
/* GET users listing. */
router.post('/login', async (req, res, next) => {
        // console.log( req.body);//{}
        let obj1 = req.body; 
        console.log(obj1);
        let find = await tfind('','username');
        console.log(find);
        for(let i = 0 ; i < find.length; i++){
            if(obj1.name == find[i].name && obj1.psd == find[i].psd){
                console.log(obj1.name);
                console.log(find[i].name);
                console.log(obj1.psd);
                console.log(find[i].psd);
                res.send('ok');
            }else{
                res.send('no');
            }    
        }
            
});
module.exports = router;
