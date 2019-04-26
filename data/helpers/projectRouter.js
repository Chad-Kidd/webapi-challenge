const express = require('express')

const Projects = require('./projectModel')

const router = express.Router()
router.use(express.json())

// GET PROJECTS WORKING
router.get('/', async (req, res) => {
   try {
       const projects = await Projects.get(req.body)
       res.status(200).json(projects)
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'could not get project'
        })
    }
})

// GET BY ID WORKING
router.get('/:id', async (req, res) => {
    try {
      const projects = await Projects.get(req.params.id);
  
      if (req.params.id) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Project',
      });
    }
  });

  // POST-INSERT
  router.post('/', async (req, res) => {
    try {
      const projects = await Projects.insert(req.body);
      res.status(201).json(projects);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the Projects',
      });
    }
  });

  // DELETE-REMOVE
  router.delete('/:id', async (req, res) => {
    try {
      const projects = await Projects.remove(req.params.id);
      if (projects > 0) {
        res.status(200).json({ message: 'The project has been nuked' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the project',
      });
    }
  });

  // PUT-UPDATE
  router.put('/:id', async (req, res) => {
    try {
      const projects = await Projects.update(req.params.id, req.body);
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: 'The projects could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the projects',
      });
    }
  });


  // WEIRD THING
  // router.get('./id/actions', (req,res) => {
  //   try {
  //     const projectActions = 
  //     Projects.getProjectActions(req.params.id)
  //   if(projectActions) {
  //     res.status(200).json(projectActions)
  //   } else {
  //     res.status(404)
  //    ({ message: "The actions of the project with the specified ID does not exist."})
  //   }
  //   } catch(error){
  //     console.log(error)
  //     res.status(500).json({
  //       message: "ERROR"
  //     })
  //   }
  // })

  // WEIRD THING
  router.get("/:id/actions", (req, res) => {
   Projects.getProjectActions(req.params.id)
      .then(Actions => {
        if (!Actions.length) {
          res.status(404).json({
            error:
              "The actions of the project with the specified ID does not exist."
          });
        } 
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The actions of the projects could not be retrieved" })
      );
  });
  module.exports = router;