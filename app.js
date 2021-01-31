 const express = require('express');
 const app = express();
 const Joi = require('joi');

 app.use(express.json());


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

 app.get('/', (req, res) => {
     res.send('hello');
 })

 // get ALl Courses
 app.get('/api/courses', (req, res) => {
    res.send(courses);
})

// create a new course
app.post('/api/courses', (req, res) => {
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
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((course) => parseInt(req.params.id) === course.id);
    if(!course) return res.status(404).send('Course not found');
    res.send(course);
})

// update the course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find((course) => parseInt(req.params.id) === course.id);
    if(!course) return res.status(404).send('Course not found');


    const {error} = ValidateCourse(req.body);
    if(error) res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

    res.send(course);
})
//delete the course
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find((course) => parseInt(req.params.id) === course.id);
    if(!course) return res.status(404).send('Course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})



function ValidateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course);
}

const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
     console.log(`listening on port ${PORT}...`);
 })