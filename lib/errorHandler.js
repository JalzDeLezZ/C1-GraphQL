'use strict'

function errorHandler (error) {
    console.error(error.message)
    throw new Error('Error: Bad request')
}

module.exports = errorHandler;