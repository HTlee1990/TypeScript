{
  interface Stack {
    readonly size: number;
    push(item: string): void;
    pop(): string;
  }

  type Node = {
    readonly value: string;
    readonly next?: Node;
    // next: Node | undefined;
  };

  class StackImpl implements Stack {
    private _size: number = 0;
    private head?: Node;
    constructor(private capacity: number) {}
    get size() {
      return this._size;
    }
    push(value: string) {
      if (this.size === this.capacity) {
        throw new Error('Stack is full!');
      }
      const node: Node = { value, next: this.head };
      this.head = node;
      this._size++;
    }
    pop(): string {
      if (this.head == null) {
        //null == undefined
        throw new Error('Stack is empty!');
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl(10);
  stack.push('mark, 1');
  stack.push('bob, 2');
  stack.push('oliv, 3');
  while (stack.size !== 0) {
    console.log(stack.pop());
  }
}
