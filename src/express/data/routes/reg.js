var express = require('express');
var router = express.Router();
var {
    tinsert
} = require('../public/javascripts/fa');

    
/* GET users listing. */
router.post('/reg', async (req, res, next) => {
        // console.log( req.body);//{}
        let obj1 = req.body; 
        let tAdd = await tinsert(obj1,'username');
        res.send(tAdd);
        // console.log(tAdd);
});
module.exports = router;
