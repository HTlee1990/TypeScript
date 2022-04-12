{
  function checkNotNullBad(arg: number | null): number {
    if (arg === null) throw new Error('not valid number');
    return arg;
  }

  //Type의 정보가 더이상 없어진다.
  function checkNotNullAnyBad(arg: any | null): any {
    if (arg === null) throw new Error('not valid number!');
    return arg;
  }

  function checkNotNull<T>(arg: T | null): T {
    if (arg === null) throw new Error('not valid number');
    return arg;
  }

  const result = checkNotNull(123);
  const boal: boolean = checkNotNull(true);
  console.log(result);
  checkNotNullBad(null);
}
