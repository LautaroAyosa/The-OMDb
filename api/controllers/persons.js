const { Person } = require('../models/Person')
const { Movie } = require('../models/Movie')


const getPersons = async (req, res) => {
    try {
        const persons = await Person.findAll({
            include: [
                {
                    model: Movie,
                    as: 'ActedIn',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                },
                {
                    model: Movie,
                    as: 'Produced',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                },
                {
                    model: Movie,
                    as: 'Directed',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                },
            ]
        })
    
        res.status(200).json(persons)
    } catch (err) {
        console.log(err)
    }
}

const getOnePerson = async (req, res) => {
    try {
        const id = req.params.id
        const person = await Person.findOne({ 
            where: {id},
            include: [
                {
                    model: Movie,
                    as: 'ActedIn',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                },
                {
                    model: Movie,
                    as: 'Produced',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                },
                {
                    model: Movie,
                    as: 'Directed',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                },
            ]
        })
    
        res.status(200).json(person)
    } catch (err) {
        console.log(err)
    }
}

const createPerson = async (req, res) => {
    try {
        const {name, lastName, age, image, acted, directed, produced} = req.body
        
        const newPerson = await Person.create({
            name,
            lastName,
            age,
            image
        })
        await newPerson.addActedIn(acted)
        await newPerson.addDirected(directed)
        await newPerson.addProduced(produced)
    
        const addedPerson = await Person.findOne({
            where: {id: newPerson.id},
            include: [
                {
                    model: Movie,
                    as: 'ActedIn',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                },
                {
                    model: Movie,
                    as: 'Produced',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                },
                {
                    model: Movie,
                    as: 'Directed',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                },
            ],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })

        res.status(201).json(addedPerson)
    } catch (err) {
        console.log(err)
    }
}

const deletePerson = async (req, res) => {
    try {
        const id = req.params.id
        const personToDelete = await Person.findOne({where: {id: id}})
    
        if (personToDelete) {
            await personToDelete.destroy()
            res.status(204).end()
        } else {
            res.status(404).json({error: 'Person not found'})
        }
    } catch (err) {
        console.log(err)
    }
}

const updatePerson = async (req, res) => {
    try {
        const { name, lastName, age, image, acted, produced, directed } = req.body
        const id = req.params.id
        const personToUpdate = await Person.findOne({where: {id: id}})
    
        if (personToUpdate) {
            const updated = await personToUpdate.update({
                name: name,
                lastName: lastName,
                age: age,
                image: image,
            })
    
            updated.setActedIn(acted)
            updated.setProduced(produced)
            updated.setDirected(directed)

            const updatedPerson = await Person.findOne({
                where: {id: updated.id},
                include: [
                    {
                        model: Movie,
                        as: 'ActedIn',
                        attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                    },
                    {
                        model: Movie,
                        as: 'Produced',
                        attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                    },
                    {
                        model: Movie,
                        as: 'Directed',
                        attributes: {exclude: ['createdAt', 'updatedAt', 'Actors_Movies']}
                    },
                ],
                attributes: {exclude: ['createdAt', 'updatedAt']}
            })
    
            res.status(200).json(updatedPerson)
        } else {
            res.status(404).json({error: 'Person not found'})
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getPersons,
    getOnePerson,
    createPerson,
    deletePerson,
    updatePerson,
}