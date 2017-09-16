import td from 'testdouble/dist/testdouble';

describe('Javascript Testing', () => {
  it('works as expected', () => {
    const mockFunction = td.function();

    td.when(mockFunction(42)).thenReturn('Function Called!');

    expect(mockFunction(42)).toBe('Function Called!');
  });
});
