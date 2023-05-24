//tested it on google chrome- the student information saves on mongo but not the tutor or tutorial, wasnt able to work out why


/* The code provided is a Node.js application that uses the Express framework to build a server-side application. It configures an API for handling student, instructor, and tutorial data and links to a MongoDB database.
Import all required modules and dependencies: To handle routing, database connectivity, cross-origin resource sharing, and request body parsing, the code imports modules such as path, express, mongoose, cors, and body-parser.
Set up the EJS templating engine: The code configures the EJS templating engine as the view engine for rendering HTML templates.
To handle request and response data, the code configures middleware functions such as cors, express.json, express.urlencoded, and body-parser.urlencoded.
specify database models: To specify the schema and operations for each object, the code requires model files for Student, Tutor, and Tutorial.
Connect to the MongoDB database: The code uses the specified connection string to connect to the MongoDB database.
Api end points were defined eg post, get
Render the index page: The code sets a route for the root URL ("/") to use the EJS template engine to render the index page. It sends empty arrays to customers and tutorials, as well as a welcome greeting.
Handle form submissions on the index page: The code defines a route ("/") to handle form submissions on the index page. It generates a new student from the request body, saves it to the database, and displays the index page with the message "Saved!"
Additional tutorial route: The code defines a route ("/tutorials") that handles both GET and POST requests for tutorial management.
The code exports the Express application so that it can be used in other modules.
*/



//Node.js with the Express framework to create a server-side application
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;
const CONNECTION = process.env.CONNECTION || 'mongodb+srv://EstherF:eHbpg4cpZFammQPG@cluster0.om2uzah.mongodb.net/test'; 


// Configure the EJS templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const Student = require('./models/student');
const Tutor = require('./models/tutor');
const Tutorial = require('./models/tutorial');

const { Schema } = mongoose;
// Connect to MongoDB database
mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set('strictQuery', false);


// Create a new tutor
app.post('/tutors', async (req, res) => {
  try {
    const tutor = new Tutor(req.body);
    await tutor.validate(); // Validate the data against the schema
    await tutor.save();
    res.status(201).json(tutor);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    } else {
      // Handle other database errors
      res.status(500).json({ error: 'An error occurred while creating the tutor' });
    }
  }
});

// Create a new student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.validate(); // Validate the data against the schema
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    } else {
      // Handle other database errors
      res.status(500).json({ error: 'An error occurred while creating the student' });
    }
  }
});


// Handle the form submission for personal details
app.post('/personal-details', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    // Set a "saved" message in the session data
    req.session.message = 'Saved';

    res.redirect('/'); // Redirect back to the index page after saving
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while saving the personal details');
  }
});

// Handle the form submission for additional details
app.post('/additional-details', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.redirect('/'); // Redirect back to the index page after saving
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while saving the additional details');
  }
});

// Handle the form submission for tutorial session details
app.post('/tutorials', async (req, res) => {
  try {
    const tutorial = new Tutorial(req.body);
    await tutorial.validate(); // Validate the data against the schema
    await tutorial.save();
    res.status(201).json(tutorial);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    } else {
      // Handle other database errors
      res.status(500).json({ error: 'An error occurred while creating the tutorial' });
    }
  }
});

// Get all tutors
app.get('/tutors', async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tutorials
app.get('/tutorials', async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific tutor
app.get('/tutors/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      res.status(404).json({ error: 'Tutor not found' });
      return;
    }
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific student
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific tutorial
app.get('/tutorials/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      res.status(404).json({ error: 'Tutorial not found' });
      return;
    }
    res.json(tutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a tutor
app.put('/tutors/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      res.status(404).json({ error: 'Tutor not found' });
      return;
    }

    // Update the tutor data
    tutor.set(req.body);
    await tutor.validate(); // Validate the updated data against the schema
    await tutor.save();
    res.json(tutor);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    } else {
      // Handle other database errors
      res.status(500).json({ error: 'An error occurred while updating the tutor' });
    }
  }
});

// Update a student
app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }

    // Update the student data
    student.set(req.body);
    await student.validate(); // Validate the updated data against the schema
    await student.save();
    res.json(student);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    } else {
      // Handle other database errors
      res.status(500).json({ error: 'An error occurred while updating the student' });
    }
  }
});

// Update a tutorial
app.put('/tutorials/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      res.status(404).json({ error: 'Tutorial not found' });
      return;
    }

    // Update the tutorial data
    tutorial.set(req.body);
    await tutorial.validate(); // Validate the updated data against the schema
    await tutorial.save();
    res.json(tutorial);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    } else {
      // Handle other database errors
      res.status(500).json({ error: 'An error occurred while updating the tutorial' });
    }
  }
});

// Delete a tutor
app.delete('/tutors/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!tutor) {
      res.status(404).json({ error: 'Tutor not found' });
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a student
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a tutorial
app.delete('/tutorials/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    if (!tutorial) {
      res.status(404).json({ error: 'Tutorial not found' });
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//connecting to the database and starting the application.
/*const start = async() => {
    try{
        await mongoose.connect(CONNECTION);

        console.log('MongoDB connected');
    }catch(e){
        console.log(e.message)
    }
};*/

app.get('/', (req, res) => {
  const customers = []; 
  const tutorials = []; 
  const message = "Welcome!";
  res.render('index', { customers, tutorials, message: message });
});

app.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    // Set a "message" variable to indicate successful submission
    const message = "Saved!";

    // Render the index template with the updated message
    const customers = [];
    const tutorials = [];
    res.render('index', { customers, tutorials, message });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while saving the form data');
  }
});

app.route('/tutorials')
  .get(async (req, res) => {
    try {
      const tutorials = await Tutorial.find();
      res.json(tutorials);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const tutorial = new Tutorial(req.body);
      await tutorial.validate(); // Validate the data against the schema
      await tutorial.save();
      res.status(201).json(tutorial);
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle validation errors
        res.status(400).json({ error: error.message });
      } else {
        // Handle other database errors
        res.status(500).json({ error: 'An error occurred while creating the tutorial' });
      }
    }
  });
  module.exports = app;

//start();


