// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks/server.js';

global.matchMedia =
    global.matchMedia ||
    function () {
        return {
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
    };

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = jest.fn();
