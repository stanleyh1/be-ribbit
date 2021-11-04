

exports.handleInvalidPaths = (req, res, next) => {
    res.status(404).send({ message: 'Path not found'})
}

exports.handleInvalidIds = (req, res, next) => {
    res.status(400).send({ message: 'Bad Request'})
}

