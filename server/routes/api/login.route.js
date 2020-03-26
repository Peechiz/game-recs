const router = require("express").Router();
const db = require('../../models');


router.route("/")
  .post((req, res) => {
    const { username, password } = req.body;
    db.User.findOne({ username }).then(function (dbUser) {
      if (!dbUser)
        return res
          .status(401)
          .json({ message: "Username or Password is incorrect." });
      if (dbUser.comparePassword(password)) {
        const token = jwt.sign(
          {
            data: dbUser._id
          },
          process.env.KEY
        );

        res.json({
          _id: dbUser._id,
          username: dbUser.username,
          token: token
        })
      } else {
        res.status(401).json({ message: "Username or password is incorrect." });
      }
    })
  })

module.exports = router;