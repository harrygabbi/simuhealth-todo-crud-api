import express from 'express' ;
import { authMiddleware } from '../middleware/authentication.js';



const Router = express.Router();

// LOGIN BEFORE CRUD TODO LIST
Router.use(authMiddleware); 

const example_TODO_test = [];

Router.get('/', (req, res) => {

    const { description, owner, category } = req.query;
    let filteredTodos = example_TODO_test;



    // FILTER LISTS ON QUERY ON BASIS OF DESC OWNER OR CATEGORY
    if (description) {
        filteredTodos = filteredTodos.filter(todo => 
        todo.description.toLowerCase().includes(description.toLowerCase())
        );
    }

    if (owner) {
        filteredTodos = filteredTodos.filter(todo => 
        todo.owner.toLowerCase() === owner.toLowerCase()
        );
    }

    if (category) {
        filteredTodos = filteredTodos.filter(todo => 
        todo.category.toLowerCase() === category.toLowerCase()
        );
    }

    res.json(filteredTodos);
});

Router.post('/', (req, res) => {
    const {description, category} = req.body;
    
    if(!description){
        res.status(400).json( {error: 'Description is missing '});
    }

    // GENERATING NEW TODO
    const newTodo = { id: (example_TODO_test.length + 1), description, category: category || 'General', owner: req.user.username,};
    example_TODO_test.push(newTodo);
    res.status(201).json(newTodo);

});

Router.put('/:id', (req, res) => {
    const TodoID = parseInt(req.params.id);
    const {description} = req.body;

    const todo = example_TODO_test.find( t => t.id === TodoID );

    if(!todo) {
        res.status(404).json({ error: 'todo couldnt found' });
    }

    if(todo.owner !== req.user.username){
        res.status(403).json( {error: 'You are not the owner. Cannot change content.'});
    }

    if(!description){
        res.status(404).json( {error: 'Description is missing '});
    }

    todo.description = description;
    res.json(todo);

});

Router.delete('/:id', (req, res) => {
    const TodoID = parseInt(req.params.id);
    const todo = example_TODO_test.find( t => t.id === TodoID );

    if(!todo) {
        res.status(404).json({ error: 'todo couldnt found' });
    }

    if(todo.owner !== req.user.username){
        res.status(403).json({ error: 'you cannot delete someone elses made todo.' });
    }

    // REMOVING TODO FROM LIST
    const todoIndex = example_TODO_test.indexOf(todo);
    example_TODO_test.splice(todoIndex, 1);
    res.status(204).send();
    
});

export default Router;