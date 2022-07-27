# appbuilder-examples

This project provides a few examples to better understand AppBuilder

# Handling state

AppBuilder provides two different way to handle state: in memory and aio-lib-state

## In Memory

In Memory is fast as it uses directly the memory of the node application that is running in the AppBuilder cluster. It's biggest drawback is that it is bound to a single instance of the application and will be lost if there is no sufficient traffic on the instance.

A good use case for this would be to store a access-token or some short living cache values.

[Deployed Example](https://343284-appbuilderexamples-stage.adobeio-static.net/api/v1/web/appbuilder-examples/state-in-memory)

[Source Code](./actions/handling-state/in-memory.js)

## AIO Lib State

AIO Lib State stores the state externally to the application, so it available to all instances of your application. As it is stored
externally it can be considered long term storage.

[Deployed Example](https://343284-appbuilderexamples-stage.adobeio-static.net/api/v1/web/appbuilder-examples/aio-lib-state-counter )

[Source Code](./actions/handling-state/lib-state.js)
