const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');

const binpath = path.resolve(__dirname, 'bin');

const serveFile = (app, filename) => {
  app.get('/' + filename, (req, res) => {
    res.sendFile(filename, {
      root: binpath,
    });
  });
};

function start(port) {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(
    '/static',
    express.static('bin/static', {
      fallthrough: false,
      maxAge: 31536000000,
    }),
  );

  const listid = process.env.MAILCHIMP_LISTID || '';
  const datacenter = process.env.MAILCHIMP_DATACENTER || '';
  const endpoint = `https://${datacenter}.api.mailchimp.com/3.0/lists/${listid}/members`;
  const mailchimpKey = process.env.MAILCHIMP_KEY || '';
  const auth =
    'Basic' + new Buffer('anystring:' + mailchimpKey).toString('base64');

  app.post('/v1/email', async (req, res) => {
    console.log("post function reached")
    const email = req.body.email;
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
          err.response.data.title == 'Invalid Resource'
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
      //console.log(JSON.stringify(response))
      res.status(status).json(response);
      return;
    }

    status = 200;
    response = {
      success: true,
      message: 'Confirmed',
    };
    //console.log(JSON.stringify(response))
    res.status(status).json(response);

    return;
  });

  // serveFile(app, 'manifest.json');
  // serveFile(app, 'favicon.ico');
  // app.get('*', (req, res) => {
  //   res.sendFile('index.html', {
  //     root: binpath,
  //   });
  // });

  app.listen(port, () => {
    console.log('Server is up and running!');
  });
}

start(3030);
