const flairQueries = require("../db/queries.flairs.js");

module.exports = {

  new(req, res, next){
     res.render("flairs/new", {topicId: req.params.topicId, postId: req.params.postId});
  }

}
