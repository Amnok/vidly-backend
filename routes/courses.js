const express = require('express');
const router = express.Router();


const courses = [
    {
        id: 1, name: 'course1',
    },
    {
       id: 2, name: 'course2',
    },
    {
       id: 3, name: 'course3',
    },
    {
       id: 4, name: 'course4',
    }
]

// get ALl Courses
router.get('/', (req, res) => {
   res.send(courses);
})

// create a new course
router.post('/', (req, res) => {
   const {error} = ValidateCourse(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   const course = {
       id: courses.length +1,
       name: req.body.name,
   }
   courses.push(course);
   res.send(course);
})

// get a course
router.get('/:id', (req, res) => {
   const course = courses.find((course) => parseInt(req.params.id) === course.id);
   if(!course) return res.status(404).send('Course not found');
   res.send(course);
})

// update the course
router.put('/:id', (req, res) => {
   const course = courses.find((course) => parseInt(req.params.id) === course.id);
   if(!course) return res.status(404).send('Course not found');


   const {error} = ValidateCourse(req.body);
   if(error) res.status(400).send(error.details[0].message);

   course.name = req.body.name;
   res.send(course);

   res.send(course);
})
//delete the course
router.delete('/:id', (req, res) => {
   const course = courses.find((course) => parseInt(req.params.id) === course.id);
   if(!course) return res.status(404).send('Course not found');

   const index = courses.indexOf(course);
   courses.splice(index, 1);
   res.send(course);
})

module.exports = router;