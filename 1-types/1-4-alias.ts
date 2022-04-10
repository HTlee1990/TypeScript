{
  /**
   * Type Aliases
   */
  type Text = string;
  const name: Text = 'mark';
  const address: Text = 'korea';

  type Num = number;
  type Student = {
    name: string;
    age: number;
  };

  const student: Student = {
    name: 'makr',
    age: 123,
  };

  /**
   * String Literal Types
   */
  type Name = 'name';
  let markName: Name;

  type JSON = 'json';
  const json: JSON = 'json';

  type Bool = true;
  const fff: Bool = true;
}
