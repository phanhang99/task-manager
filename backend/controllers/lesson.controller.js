const Lesson = require('../models/lesson.model');
const Score = require('../models/score.model')

module.exports.index = (req, res) => {
  Lesson.find().then(lessons => {
    res.status(200).send(lessons);
  },error => {
    res.status(500).send(error);
  })
}

module.exports.get = async (req, res) => {
  Lesson.findById(req.params.id, (err,doc) => {
    if(doc) res.status(200).send(doc)
    else res.status(400).send('Failed with invalid input parameter')
  })
}

module.exports.postCreate = (req, res) => {
  Lesson.create(req.body).then(lesson => {
    res.status(200).send(lesson)
  }).catch(err => {
    res.status(500).send(err)
  })
}

module.exports.delete = async (req, res) => {
  var id = req.params.id
  await Lesson.remove({ _id: id }).catch(err => {
    res.status(500).send('Failed with internal server error')
  });
  await Score.remove({ lesson_id: id }).catch(err => {
    res.status(500).send('Failed with internal server error')
  });
  res.status(204).send('successful operation')
}

module.exports.update = async (req, res) => {
  var id = req.params.id
  Lesson.findById(id, function (err, doc) {
    if (err){
      res.status(500).send('Failed with internal server error')
    }
    else if(!doc) res.status(400).send('Failed with invalid input parameter')
    doc.name = req.body.name ? req.body.name : doc.name;
    doc.content = req.body.content ? req.body.content : doc.content;
    doc.level = req.body.level ? req.body.level : doc.level;
    doc.save(() => res.status(200).send(doc));
  });
}