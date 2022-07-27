/*
* <license header>
*/

jest.mock('@adobe/aio-sdk', () => ({
    Core: {
        Logger: jest.fn()
    }
}))

const { Core } = require('@adobe/aio-sdk')
const { expect } = require('@jest/globals')
const mockLoggerInstance = { info: jest.fn(), debug: jest.fn(), error: jest.fn() }
Core.Logger.mockReturnValue(mockLoggerInstance)

const action = require('./../actions/handling-state/in-memory.js')

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
