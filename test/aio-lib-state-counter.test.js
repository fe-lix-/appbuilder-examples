/*
* <license header>
*/

jest.mock('@adobe/aio-sdk', () => ({
    Core: {
        Logger: jest.fn()
    }
}))

jest.mock('@adobe/aio-lib-state', () => ({
        init: jest.fn()
}))

const { Core } = require('@adobe/aio-sdk')
const { expect } = require('@jest/globals')
const stateLib = require('@adobe/aio-lib-state')
const mockLoggerInstance = { info: jest.fn(), debug: jest.fn(), error: jest.fn() }
Core.Logger.mockReturnValue(mockLoggerInstance)
let storage = {}
const state = {
    put: (key, value) => {
        storage[key] = value
    },
    get: (key) => {
        if (storage[key] !== undefined) {
            return {value: storage[key], key: key}
        }
        return undefined
    }
}
stateLib.init.mockReturnValue(state)

const action = require('../actions/handling-state/lib-state.js')

beforeEach(() => {
    Core.Logger.mockClear()
    mockLoggerInstance.info.mockReset()
    mockLoggerInstance.debug.mockReset()
    mockLoggerInstance.error.mockReset()
})


describe('generic', () => {
    test('calling the counter twice should return 2', async () => {
        const firstResult = await action.main({})
        expect(firstResult.body).toEqual({ value: 1 })
        const secondResult = await action.main({})
        expect(secondResult.body).toEqual({ value: 2 })
    })
})
