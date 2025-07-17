// Basic smoke tests to ensure the test setup works

describe('Basic Tests', () => {
  it('should run basic arithmetic', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle string operations', () => {
    expect('hello'.toUpperCase()).toBe('HELLO');
  });

  it('should work with arrays', () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
    expect(arr.includes(2)).toBe(true);
  });

  it('should work with objects', () => {
    const obj = { name: 'Portfolio', type: 'React App' };
    expect(obj.name).toBe('Portfolio');
    expect(obj.type).toBe('React App');
  });
});
