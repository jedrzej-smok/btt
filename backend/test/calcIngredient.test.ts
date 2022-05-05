import {calcIngredient} from '../src/utils/calcIngredient';
test('testcase 1', () => {
    expect(calcIngredient(JSON.parse('{"strIngredient":"John", "age":30, "city":"New York"}'))).toBe(1);
});

test('testcase 2', () => {
    expect(calcIngredient(JSON.parse('{"strIngredient1":"John", "strIngredient2":"John2", "strIngredient3":"", "strIngredient4":null}'))).toBe(2);
});


