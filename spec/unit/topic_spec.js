const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
     this.topic;
     this.post;
     this.user;

     sequelize.sync({force: true}).then((res) => {

       User.create({
         email: "starman@tesla.com",
         password: "Trekkie4lyfe"
       })
       .then((user) => {
         this.user = user; //store the user

         Topic.create({
           title: "Expeditions to Alpha Centauri",
           description: "A compilation of reports from recent visits to the star system.",
           posts: [{
             title: "My first visit to Proxima Centauri b",
             body: "I saw some rocks.",
             userId: this.user.id
           }]
         }, {
           include: {
             model: Post,
             as: "posts"
           }
         })
         .then((topic) => {
           this.topic = topic; //store the topic
           this.post = topic.posts[0]; //store the post
           done();
         })
       })
     });
   });

  describe("#create()", () => {

     it("should create a topic object with a title and description", (done) => {

       Topic.create({
         title: "Classical Music",
         description: "Where we debate the greatest composers of all time"
       })
       .then((topic) => {
         expect(topic.title).toBe("Classical Music");
         expect(topic.description).toBe("Where we debate the greatest composers of all time");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });

     });

     it("should not create a title with missing title or description", (done) => {

       Topic.create({
         title: "Classical Music"
       })
       .then((topic) => {

        // the code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there

         done();
       })
       .catch((err) => {
         expect(err.message).toContain("Topic.description cannot be null");
         done();
       })

     });

   });

   describe("#getPosts()", () => {

    it("should return the associated posts", (done) => {

      this.topic.getPosts()
      .then((posts) => {
        expect(posts[0].title).toBe("My first visit to Proxima Centauri b");
        done();
       });

     });

   });


});
