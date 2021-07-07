const express = require('express')

const Actions = require('./actionModel')

const router = express.Router()
// router.use(express.json())

// GET ACTIONS
router.get('/', async (req, res) => {
   try {
       const actions = await Actions.get(req.body)
       res.status(200).json(actions)
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'could not get action'
        })
    }
})

// router.get('/', (req, res) =>{
//   Actions.get()
//   .then( actions => {
//       res.status(200).json(actions)
//   })
//   .catch( error => {
//       res.status(500).json({error:{message: " that ain't it chief"}})
//   })
// })

// GET BY ID
router.get('/:id', async (req, res) => {
    try {
      const actions = await Actions.get(req.params.id);
  
      if (req.params.id) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: 'Actions not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Actions',
      });
    }
  });

  // POST-INSERT
  router.post('/', async (req, res) => {
    try {
      const newactions = await Actions.insert(req.body);
      res.status(201).json(newactions);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the Actions',
      });
    }
  });

  // DELETE-REMOVE
  router.delete('/:id', async (req, res) => {
    try {
      const actions = await Actions.remove(req.params.id);
      if (actions > 0) {
        res.status(200).json({ message: 'The action has been nuked' });
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the action',
      });
    }
  });

  // PUT-UPDATE WORKING
  router.put('/:id', async (req, res) => {
    try {
      const actions = await Actions.update(req.params.id, req.body);
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: 'The actions could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the actions',
      });
    }
  });

  module.exports = router;