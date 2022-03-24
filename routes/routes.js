const router = require('express').Router();
const tasks = require('../models/Task');

router.get('/task', (req,res) =>{
  var mytasks;
  tasks.find({}, (err,data) => {
    if(err) {
      console.log(err);
    } if (data) {
        mytasks = data;
    }
    res.render('../views/task', { data: mytasks });
  });
});

router.post('/add', (req,res) => {
  const task = req.body.task;
  tasks({ task : task }).save(function (err,doc) {
    if(err){
      console.log(err);
    }
    res.redirect('/task');
  });
});

router.post('/delete', (req,res) => {
  const id = req.body.id;

  tasks.findOneAndRemove({ _id: id}, (err, doc) => {
    res.redirect('/task');
  });
});

router.post('/update', (req,res) => {
  const id = req.body.id;

  tasks.findOneAndUpdate({ _id: id }, {status: true }, (err,doc) => {
    res.redirect('/task');
  });
});

module.exports = router;
