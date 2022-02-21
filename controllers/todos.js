const Todo = require ('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        try {
            const todoItems = await Todo.find()
            const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('todo.ejs',{todos: todoItems, left: itemsLeft})
        } catch (err) {
            console.err(err)
        }
    },
    createTodo: async (req,res)=>{
        try {
            await Todo.create({todo: req.body.todoItem, completed: false})
            console.log('todo added')
            res.redirect('/todos')
        } catch (err) {
            console.error(err)
        }
    },
    markComplete: async (req,res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Inomplete')
            res.json('marked complete')
        } catch (err){
            console.error(err)
        }
    },
    markIncomplete: async (req,res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Complete')
            res.json('marked incomplete')
        } catch (err){
            console.error(err)
        }
    },
    deleteTodo: async (req,res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted it')
        } catch(err){
            console.error(err)
        }
    }
}