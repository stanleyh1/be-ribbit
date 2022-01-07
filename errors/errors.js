
exports.handleSomeErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
      }
}

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'Bad request' });
    } else next(err);
  };

  // format your error handling like the PSQL one^
// do it in right order
// change your errors so they are sending back what is in the object in the models function (custom errors)
//  

// app.use((err, req, res, next) => {
//   // handle custom errors
//   if (err.status && err.msg) {
//     res.status(err.status).send({ msg: err.msg });
//   }
