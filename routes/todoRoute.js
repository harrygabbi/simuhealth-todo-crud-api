import express from 'express' ;

const Router = express.Router();
const example_TODO_test = [
    { id: 1, description: 'Buy groceries' },
    { id: 2, description: 'Learn Node.js' },
];

Router.get('/', (req, res) => {
  res.json(example_TODO_test);
});

Router.post('/', (req, res) => {
    const {description} = req.body;
    
    if(!description){
        res.status(404).json( {error: 'Description is missing '});
    }

    const newTodo = { id: (example_TODO_test.length + 1), description };
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

    if(!description){
        res.status(404).json( {error: 'Description is missing '});
    }

    todo.description = description;
    res.json(todo);

});

Router.delete('/:id', (req, res) => {
    const TodoID = parseInt(req.params.id);
    const todo = example_TODO_test.find( t => t.id === TodoID );

    if(todo == -1) {
        res.status(404).json({ error: 'todo couldnt found' });
    }

    example_TODO_test.splice(todo, 1);
    res.status(204).send();
    
});

export default Router;