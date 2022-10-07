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

// Override antd Form validator warnings in unit tests
// https://github.com/ant-design/ant-design/issues/9412
const filters = ['async-validator:'];
const _warn = console.warn;
console.warn = function (msg, ...args) {
    filters.some((filter) => msg.includes(filter))
        ? jest.fn()
        : _warn.apply(console, [msg, ...args]);
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = jest.fn();
