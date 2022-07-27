 const { Core } = require('@adobe/aio-sdk')
 const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')
 const stateLib = require('@adobe/aio-lib-state')


 
 // main function that will be executed by Adobe I/O Runtime
 async function main (params) {
   // create a Logger
   const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
 
   try {
     // 'info' is the default level if not set
     logger.info('Calling the main action')
 
     // log parameters, only if params.LOG_LEVEL === 'debug'
     logger.debug(stringParameters(params))
 
     // check for missing request input parameters and headers
     const requiredParams = [/* add required params */]
     const requiredHeaders = []
     const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
     if (errorMessage) {
       // return and log client errors
       return errorResponse(400, errorMessage, logger)
     }

      // init when running in an Adobe I/O Runtime action (OpenWhisk) (uses env vars __OW_API_KEY and __OW_NAMESPACE automatically)
     const state = await stateLib.init()
     const res = await state.get('counter')
     let newValue = 1
     if (res !== undefined && res.value !== undefined) {
      newValue = res.value + 1
     }
     await state.put('counter', newValue)
     logger.info('Current counter value: ' + newValue)
 
     return {statusCode: 200, body: {value: newValue}}
   } catch (error) {
     // log any server errors
     logger.error(error)
     // return with 500
     return errorResponse(500, 'server error', logger)
   }
 }
 
 exports.main = main
 