const router = require("express").Router();

router.route('/')
  .post(async (req, res) => {
    const __K__ = JSON.parse(process.env.K)

    if (Array.isArray(req.body)) {
      const isValid = req.body.reduce((prev, curr, i) => {
        if (curr !== __K__[i]) {
          return false
        }
        return prev
      }, true)

      if (isValid) console.log('CODE ACCEPTED');
      isValid ? res.send({code: 64}) : res.send({code: 0});
    }
  })

module.exports = router;
