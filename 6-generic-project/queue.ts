{
  interface Queue<T> {
    readonly total: number;
    enqueue(value: T): void;
    dequeue(): T;
  }

  type Node<T> = {
    value: T;
    after?: Node<T>;
  };

  class QueueImple<T> implements Queue<T> {
    private _total: number = 0;
    private first?: Node<T>;
    private cur?: Node<T>;
    constructor(private capacity: number) {
      this.capacity = capacity;
    }

    get total(): number {
      return this._total;
    }

    enqueue(value: T): void {
      if (this.total === this.capacity) {
        throw new Error('Your capacity is already full');
      }
      const node: Node<T> = { value };

      //첫번째 노드라면 first에 세팅
      if (!this.first) {
        this.first = node;
        this.cur = node;
      } else {
        this.cur!.after = node;
        this.cur = node;
      }

      this._total++;
    }

    dequeue(): T {
      if (this.first === null) {
        throw new Error('your queue is already empty!');
      }
      const beforeNode = this.first;
      this.first = this.first?.after;
      this._total--;
      return beforeNode!.value;
    }
  }

  const queue = new QueueImple<string>(10);
  queue.enqueue('mark, 1');
  queue.enqueue('bob, 2');
  queue.enqueue('oliv, 3');
  while (queue.total !== 0) {
    console.log(queue.dequeue());
  }
  const queue2 = new QueueImple<number>(10);
  queue2.enqueue(123);
  queue2.enqueue(456);
  queue2.enqueue(789);
  while (queue2.total !== 0) {
    console.log(queue2.dequeue());
  }
}
