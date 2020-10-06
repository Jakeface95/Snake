const randomFood = require("../food");

describe("Random Food function", () => {
    test("Given a minimum number is entered and a maximum number is entered, a random whole number is returned.", () => {
        const min = 0;
        const max = 400;
        expect(typeof randomFood(min, max)).toBe('number')
    });
    test("Given a minimum number is entered and a maximum number is entered, the number is higher than the minimum.", () => {
        const min = 0;
        const max = 400;
        expect(randomFood(min, max)).toBeGreaterThan(min);
    });
    test("Given a minimum number is entered and a maximum number is entered, the number is lower than the maximum.", () => {
        const min = 0;
        const max = 400;
        expect(randomFood(min, max)).toBeLessThan(max);
    });
});
// Given  a minimum and a maximum is supplied, it returns a random whole number
// 
