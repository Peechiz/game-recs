const axios = require('axios').default;
const { response } = require('express');
const moment = require('moment');

const getToken = async () => {
  const token = await axios({
    url: "https://id.twitch.tv/oauth2/token",
    method: 'POST',
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials'
    }
  }).then(response => response.data)
    .catch(err => console.log(err))
  console.log('Created Token:', token)
  return {
    moment_expires: moment().add(token['expires_in'], 's'),
    ...token
  };
}

module.exports = getToken;