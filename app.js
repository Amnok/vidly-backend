 const express = require('express');
 const app = express();
 const Joi = require('joi');
 const helmet = require('helmet');
 const morgan = require('morgan');
 const logger = require('./middleware/logger');
 const config = require('config');
 const courses = require('./routes/courses');

 app.use(express.json());
 app.use(express.urlencoded());
 app.use(express.static('public'));
 app.use(helmet());
 app.use(morgan('tiny'));
 app.use('/api/courses', courses);
 app.use(logger);



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