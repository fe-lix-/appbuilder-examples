
 const fetch = require('node-fetch')
 const { Core } = require('@adobe/aio-sdk')
 const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')

 let counter = 0;
 
 // main function that will be executed by Adobe I/O Runtime
 async function main (params) {
   // create a Logger
   const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
 
   try {
     // 'info' is the default level if not set
     logger.info('Calling the main action')
 
     // log parameters, only if params.LOG_LEVEL === 'debug'
     logger.debug(stringParameters(params))
 
     logger.info('Current counter value: ' + counter)
     // check for missing request input parameters and headers
     const requiredParams = [/* add required params */]
     const requiredHeaders = []
     const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
     if (errorMessage) {
       // return and log client errors
       return errorResponse(400, errorMessage, logger)
     }

     counter += 1
 
     return {statusCode: 200, body: {value: counter}}
   } catch (error) {
     // log any server errors
     logger.error(error)
     // return with 500
     return errorResponse(500, 'server error', logger)
   }
 }
 
 exports.main = main
 