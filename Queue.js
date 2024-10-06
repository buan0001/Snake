export default class Queue {
  head = null;
  tail = null;
  capacity = 1;

  constructor(head = null) {
    this.head = head;
    this.tail = head;
  }

  eat() {
    this.capacity++;
    return this.capacity;
  }

  move(data) {
    if (this.size() >= this.capacity) {
      this.dequeue();
    }
    this.enqueue(data);
    return this.tail;
  }

  enqueue(data) {
    const newNode = new Node(data);
    if (this.tail) {
      // Make every node point backwards
      this.tail.next = newNode;
    }
    // Before setting the new node as tail
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
  }

  dequeue() {
    // Empty list
    if (!this.head) {
      return;
    }
    // More than one element
    if (this.head.next) {
      this.head = this.head.next;
    }
    // Exactly one element
    else {
      this.clear();
    }
  }

  peek() {
    return this.head;
  }

  get(index) {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (!current) {
        return;
      }
      current = current.next;
    }
    return current;
  }

  clear() {
    this.head = null;
    this.tail = null;
  }

  size() {
    let current = this.head;
    let count = 0;
    while (current) {      
      count++;
      current = current.next;
    }
    return count;
  }
  dumpList() {
    let current = this.head;
    while (current) {
      console.log(current);
      current = current.next;
    }
  }

  [Symbol.iterator]() {
    let current = this.head;

    return {
      next: () => {
        if (current) {
          const returnVal = current;
          current = current.next;
          return { value: returnVal, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

class Node {
  data;
  next;
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }

  setNext(newNext) {
    this.next = newNext;
  }
}
