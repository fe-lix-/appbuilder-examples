const { Core } = require('@adobe/aio-sdk')
const { stringParameters, checkMissingRequestInputs } = require('../utils')
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')
const fetch = require('node-fetch')

const endpointURL = 'https://api.twitter.com/2/tweets'

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  logger.info('Calling the main action')
  const requiredParams = [
    'TWITTER_CONSUMER_KEY',
    'TWITTER_CONSUMER_SECRET',
    'TWITTER_ACCESS_TOKEN',
    'TWITTER_ACCESS_SECRET',
    'tweet'
  ]
  const requiredHeaders = []
  const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)

  if (errorMessage) {
    return { error: errorMessage }
  }

  try {
    const payload = params.tweet
    const request = {
      method: 'POST',
      url: endpointURL
    }

    const oauth = OAuth({
      consumer: { key: params.TWITTER_CONSUMER_KEY, secret: params.TWITTER_CONSUMER_SECRET },
      signature_method: 'HMAC-SHA1',
      hash_function (baseString, key) {
        return crypto
          .createHmac('sha1', key)
          .update(baseString)
          .digest('base64')
      }
    })

    const oauthData = oauth.authorize(request, { key: params.TWITTER_ACCESS_TOKEN, secret: params.TWITTER_ACCESS_SECRET })

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: oauth.toHeader(oauthData).Authorization
      },
      body: JSON.stringify(payload)
    }

    logger.info(stringParameters(options))

    const response = await fetch(endpointURL, options)
    const body = await response.json()

    return body
  } catch (error) {
    return { error }
  }
}

exports.main = main
