{
  /**
   * Type Assertion -> 사용을 추천하지는 않는다.
   */

  function jsStrFunc(): any {
    return 'hello';
  }

  const result = jsStrFunc();
  //result 가 string인 것임에 확실 할때!
  console.log((result as string).length);
  console.log(<string>result.length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); //앱이 죽게 된다.

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers();
  numbers?.push(2);
  numbers!.push(2); // 무조건 numbers가 array라고 1000% 확신할 때!

  //querySelector는 요소가 있을 수도, 없을 수도(null) 있다.
  //만약 버튼이 있다는걸 1000%확신시 아래처럼 사용가능!
  const button = document.querySelector('class')!;
}
