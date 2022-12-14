const { DataTypes } = require('sequelize')
const { sequelize } = require('./index')
const { Movie } = require('../models/Movie')

const Person = sequelize.define('persons', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: DataTypes.INTEGER,
    image: {
        type: DataTypes.STRING,
        defaultValue: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
    }
})

Person.belongsToMany(Movie, {
    through: 'Actors_Movies',
    as: 'ActedIn',
    foreignKey: 'actorId'
})
Movie.belongsToMany(Person, {
    through: 'Actors_Movies',
    as: 'Cast',
    foreignKey: 'movieId'
})

Person.belongsToMany(Movie, {
    through: 'Directors_Movies',
    as: 'Directed',
    foreignKey: 'directorId'
})
Movie.belongsToMany(Person, {
    through: 'Directors_Movies',
    as: 'Directors',
    foreignKey: 'movieId'
})

Person.belongsToMany(Movie, {
    through: 'Producers_Movies',
    as: 'Produced',
    foreignKey: 'producerId'
})
Movie.belongsToMany(Person, {
    through: 'Producers_Movies',
    as: 'Producers',
    foreignKey: 'movieId'
})


module.exports = {
    Person
}