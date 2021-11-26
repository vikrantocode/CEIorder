const Note = require('../../models/Note')

const getNotes = async (req, res) => {
    const notes = await Note.findAll({})
    return res.status(200).json(notes)
}
const getNote = async (req, res) => {
    const note = await Note.findOne({ id : parseInt(req.params.id)})
    if(!note) return res.status(404).json({error : 'There is no Note with the provided ID...'})
    return res.status(200).json(note)
}
const getProductNote = async (req, res) => {
    const basicProductDetailId = req.params.id
    const productNotes = await Note.findAll({where : { basicProductDetailId }})
    console.log(productNotes);
    if(!productNotes) return res.status(404).json({error : 'There is no note for the Product...'})
    return res.status(200).json(productNotes)
}

const createNote = async (req, res) => {
    try {
        const note = await Note.create(req.body)
        return res.status(200).json({
            success: "Note added",
            data : note
        })
    }catch(error){
        const {name, stack, message} = error
        if(name === 'SequelizeValidationError')
            return res.status(400).json(`${name} : ${message}`)
        console.log(stack)
        return res.status(500).send('Something Went Wrong!!!')
    }
}
const deleteNote = async (req, res) => {
    const id = parseInt(req.params.id)
    const note = await Note.findOne({ id})
    if(!note) return res.status(404).json({error : 'There is no Note with the provided ID...'})
    try {
        const note = await Note.destroy({ where: { id } })
        return res.status(200).json({
            success: "Note Deleted",
            data : note
        })
    }catch(error){
        const {name, stack, message} = error
        if(name === 'SequelizeValidationError')
            return res.status(400).json(`${name} : ${message}`)
        console.log(stack)
        return res.status(500).send('Something Went Wrong!!!')
    }
}

module.exports = {
    getNotes : getNotes,
    getNote : getNote,
    createNote : createNote,
    deleteNote : deleteNote,
    getProductNote : getProductNote
}