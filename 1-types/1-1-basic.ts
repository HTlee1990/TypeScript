{
  /**
   * JavaScript
   * Primitive: number, string, boolean, bigint, symbol, undefined
   * Object: function, array, ...
   */

  // number
  const num: number = -5;
  // string
  const str: string = 'ho';
  // boolean
  const boal: boolean = false;

  //undefined -> 아직까지 값이 결정되지 않은 것
  //   let age: undefined 💩
  let age: number | undefined;
  age = undefined;
  age = 1;
  function find(): number | undefined {
    return undefined;
  }

  //null -> 값이 없는 것으로 이미 결정된 것
  //솔직히 단독으로 쓸모는 없다.💩
  let person: string | null;

  //unknown -> 아직 뭘 담을지 잘 모르겠다. 안쓰는 걸 권장.💩
  let notSure: unknown = 0;
  notSure = 'he';
  notSure = true;

  //any -> 아무거나 다 담아 지는 것. 안쓰는 걸 권장. 💩
  let anyting: any = 0;
  anyting = 'string';
  anyting = true;

  //void
  function print(): void {
    console.log('hello');
    return;
  }

  let unusable: void = undefined; //💩

  //never -> 절대절대 리턴할 수 없는 타입 e.g. throw Error
  function throwError(): never {
    //message -> server (log)
    throw new Error();
  }

  let neverEnding: never; //💩

  let obj: object; //모든 오브젝트 형태의 데이터 가능 💩
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: 'HTL' });
  acceptSomeObject([1, 2, 3]);
}

// 1. 특징
// 컴파일언어, 정적타입 언어이다. ⇒ 자바 스크립트는 인터프리터, 동적타입의 언어로써 브라우저등과 같은 런타임에서 오류를 알 수 있다. ⇒ 이에 반해, 정적타입 언어인 타입스크립트는 코드작성 단계에서 타입을 체크해 오류를 발견할 수 있고, 미리 타입을 결정하기 때문에 실행속도가 매우 빠르다. ⇒ 이렇게, 타입스크립트는 정적타입의 컴파일 언어이며, 타입스크립트 컴파일러 또는 바벨을 통해 자바스크립트로 변환된다. ⇒ 단, 코드 작성량이 많아지고, 컴파일 시간이 오래 걸린다.

// 자바스크립트의 수퍼셋(superset)이다. ⇒ 즉, 자바스크립트 문법 위에 타입스크립트 문법을 추가한 언어라는 뜻이다.

// 객체지향 프로그래밍 지원 ⇒ES6에서 새롭게 사용된 문법을 포함하고 있으며 클래스, 인터페이스, 상속, 모듈 등과 같은 객체 지향 프로그래밍 패턴을 제공한다.
