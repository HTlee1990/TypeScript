{
  /**
   * Type Inference -> 따로 타입을 선언하지 않아도, 추론하여 타입을 정하는 것
   * 매우 간단한 경우가 아니라면, 사용이 별로 추천되지는 않는다.
   */
  let text = 'hello';

  //아래의 경우, 타입을 명시하지 않으면, any Type이 할당되게 된다.
  //기본값을 주는 것으로도 타입을 infer 할수 있게 된다.
  function print(message = 'hello') {
    console.log(message);
  }

  function add(x: number, y: number) {
    return x + y;
  }

  const result = add(1, 2);
}
