const express = require('express')
const path = require('path')
const compression = require('compression')
const axios = require('axios')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(morgan('dev'));
const jsonParser = bodyParser.json()

// Have Node serve the files for our built React app
app.use("/", express.static(path.resolve(__dirname, 'build')));

const listid = process.env.MAILCHIMP_LISTID || '';
const datacenter = process.env.MAILCHIMP_DATACENTER || '';
const endpoint = `https://${datacenter}.api.mailchimp.com/3.0/lists/${listid}/members`;
const mailchimpKey = process.env.MAILCHIMP_KEY || '';
// Seems to be unused right now
// const auth =
//   'Basic' + new Buffer('anystring:' + mailchimpKey).toString('base64');
const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

app.post("/v1/email", jsonParser, async (req, res) => {
  try {
    const email = req.body.email;

    if (!email || !email.trim() || !emailRe.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email',
      });

      return;
    }
    const options = {
      method: 'POST',
      url: endpoint,
      data: {
        email_address: email,
        status: 'subscribed',
      },
      auth: {
        username: 'any',
        password: mailchimpKey,
      },
    };

    let response;
    let status;

    try {
      console.log('listid: ' + listid)
    } catch (err) {
      console.log(err)
    }

    try {
      await axios(options);
    } catch (err) {
      if (err.response) {
        status = err.response.status;
        response = {
          success: false,
          message: 'Error',
          reason:
            err.response.data.title === 'Invalid Resource'
              ? err.response.data.detail
              : err.response.data.title,
        };
        console.log(response);
      } else if (err.request) {
        status = 500;
        response = {
          success: false,
          message: 'Error',
          reason: 'the MailChimp API is down',
        };
      } else {
        status = 500;
        response = {
          success: false,
          message: 'Error',
          reason: 'there was a problem on our end',
        };
      }
      res.status(status).json(response);
      return;
    }

    status = 200;
    response = {
      success: true,
      message: 'Confirmed',
    };

    res.status(status).json(response).send();
  }
  catch (e) {
    console.error(e)
    res.status(500).send()
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
