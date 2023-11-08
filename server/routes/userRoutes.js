const express = require('express')
const router = express.Router()
const {User} = require('../db/index')



router.get('/:userId', (req, res) => {
    const id = req.params.userId
    User.find({_id: id})
    .then((user) => {
      if(user){
        res.status(200).send(user)
      }
    })
  })

router.put('/achievements/:userId', (req, res) => {
  //destructure params from req obj
  console.log('bbb')
  const { userId } = req.params;
  const newAchieve = req.body;
  console.log('SERVER PUT', req.body, newAchieve)
  //return the updated user
  User.findByIdAndUpdate(
    userId,
    { $push: { achievements: newAchieve } },
    { new: true },//sends back the updated user with new
  )
    .then((user) => {
      if (user) {
        //console.log('Updated user', user)
        res.status(200).send(user);
      } else { //else get back null
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      //console.error('SERVER ERROR: failed to PUT user achievements', err);
      res.sendStatus(500);
    })
})

// router.get('/achievements', (req, res) => {
//     console.log('hmm')
//     // User.find({}) // empty filter object to TEST IN POSTMAN
//     //   .then((user) => { // now we have a collection to send back
//     //     // success case send the data in the response
//     //     res.status(200).send(user);
//     //   })
//     //   .catch((err) => {
//     //     // handle errors
//     //     console.error('FAILED to find all users', err);
//     //     res.sendStatus(500);
//     //   });
//   });

  router.get('/leaderboard/:type', (req, res) => {
    const filterUsers = (filterProp) => User.find({}, null).sort({ [filterProp]: -1 });
    const { type } = req.params;
    if (type === 'smartest') {
      filterUsers('questionCount')
        .then((users) => {
          if (users) {
            res.status(200).send(users);
          } else {
            res.sendStatus(404);
          }
        })
        .catch((err) => {
          //console.error('get LB/smartest ERROR (server):', err);
          res.sendStatus(500);
        });
    } else if (type === 'richest') {
      filterUsers('coinCount')
        .then((users) => {
          if (users) {
            res.status(200).send(users);
          } else {
            res.sendStatus(404);
          }
        })
        .catch((err) => {
          //console.error('get LB/richest ERROR (server):', err);
          res.sendStatus(500);
        });
    }
  });

  router.get('/meals/:userId', (req, res) =>{
    console.log(req.params)
    const { coinCount, meals } = req.body
    const { userId } = req.params;
  
    User.findByIdAndUpdate(userId, {
      $set: {coinCount: coinCount.newCount},
      $push: {meals: meals.meal}
    }, {returnDocument: 'after'} )
    .then((updatedUser) => {
      updatedUser ? res.status(200).send(updatedUser) : res.sendStatus(404)
    })
    .catch((err) => console.error('meals put req server ERROR:', err))
    })

    
router.put('/:_id', (req, res) => {
    const { _id } = req.params;
    const { url } = req.body.dog;
    User.findByIdAndUpdate(
      { _id },
      { $inc: { questionCount: 1, coinCount: 1, dogCount: 1 }, $push: { breeds: url } },
      { new: true },
    )
      .then((user) => {
        if (!user) {
          res.sendStatus(404);
        } else {
          res.status(200).send(user);
        }
      })
      .catch((err) => {
        console.error('SERVER ERROR: failed to PUT user after correct answer', err);
        res.sendStatus(500);
      });
  });
  
  router.get('/search/:username', (req, res) => {
    const { username } = req.params
    User.findOne({ username })
      .then((user) => {
        user ? res.status(200).send(user) : res.sendStatus(404);
      })
      .catch((err) => {
        console.error('search user (server) error:', err)
        res.sendStatus(500);
      })
  })


  module.exports = router