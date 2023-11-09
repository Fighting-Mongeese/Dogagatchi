const express = require('express')
const router = express.Router()
const { Dog, User } = require('../db/index');


// **************** GET ROUTES ********************

//GET DOG BY USER ID

router.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    Dog.find().where({ owner: userId })
        .then((dogsArr) => {
            User.findById(userId)
                .then(({ breeds }) => {
                    res.status(200)
                        .send({ dogsArr, breeds })
                })
                .catch((err) => {
                    console.error('SERVER ERROR: failed to GET user breeds list by id', err);
                    res.sendStatus(500);
                });
        })
        .catch((err) => {
            console.error('SERVER ERROR: failed to GET dog by userId', err);
            res.sendStatus(500);
        });
});

//GET DOG BY DOG ID

router.get('/id/:dogId', (req, res) => {
    const { dogId } = req.params;

    Dog.findById(dogId)
        .then((dog) => {
            res.status(200).send(dog)
        })
        .catch((err) => {
            console.error('SERVER ERROR: failed to GET dog by id', err);
            res.sendStatus(500);
        });
})

// **************** POST ROUTES ********************

//POST DOG

router.post('/', (req, res) => {
    const { name, img, owner } = req.body;
    const status = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    Dog.create({
        name,
        img,
        owner,
        feedDeadline: status,
        walkDeadline: status
    })
        .then(() => {
            return User.findByIdAndUpdate(owner, { $inc: { coinCount: -15, dogCount: -1 }, $pull: { breeds: img } }, { new: true })
                .catch((err) => {
                    console.error('SERVER ERROR: failed to UPDATE user', err);
                    res.sendStatus(500);
                })
        })
        .then((updatedUser) => res.status(201).send(updatedUser))
        .catch((err) => {
            console.error('SERVER ERROR: failed to CREATE dog', err);
            res.sendStatus(500);
        })
})

// **************** PUT ROUTES ********************

//PUT BY DOOG ID

router.put('/:dogId', (req, res) => {
    const { dogId } = req.params;
    const { status } = req.body;

    Dog.findByIdAndUpdate(dogId, status, { returnDocument: 'after' })
        .then((updatedDog) => {
            if (updatedDog) {
                res.status(200).send(updatedDog);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error('SERVER ERROR: failed to UPDATE dog status by id', err);
            res.sendStatus(500);
        });
});

// **************** DELETE ROUTES ********************

//DELETE BY DOG ID

router.delete('/:dogId', (req, res) => {
    const { dogId } = req.params;

    Dog.findByIdAndDelete(dogId)
        .then((deletedDog) => {
            if (deletedDog) {
                return res.status(200).send(deletedDog);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error('SERVER ERROR: failed to DELETE dog by id', err);
            res.sendStatus(500);
        });
})









module.exports = router