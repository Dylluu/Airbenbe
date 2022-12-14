const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('Must have first name'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Must have last name'),
    handleValidationErrors
  ];

  // handler for signing up user
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { email, password, username, firstName, lastName } = req.body;

      try{
      const user = await User.signup({ email, username, password, firstName, lastName });

      const token = await setTokenCookie(res, user);

      const responseBody = {
        id: user.id,
        firstName,
        lastName,
        email,
        username,
        token
      };

      return res.json(
        responseBody
      );
    } catch (error){
      if(error.errors[0].path.toString() === 'email'){
        res.status(403);
        return res.json({
          message: "User already exists",
          statusCode: 403,
          errors: {
            email: 'User with that email already exists'
          }
        })
      } else if(error.errors[0].path.toString() === 'username'){
        res.status(403);
        return res.json({
          message: "User already exists",
          statusCode: 403,
          errors: {
            username: 'User with that username already exists'
          }
        })
      }
    }
    }
  );

module.exports = router;
