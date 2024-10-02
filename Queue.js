export default class Queue {
  head = null;
  tail = null;

  constructor(head = null) {
    this.head = head;
    this.tail = head;
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
    if (!this.head) {
      console.log("empty list");

      return;
    }
    if (this.head.next) {
      console.log("not empty");

      this.head = this.head.next;
    } else {
      console.log("removing last element from list");
      this.head = null;
      this.tail = null;
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

  size() {
    let current = this.head;
    let count = 0;
    while (current) {
      count++;
      current = current.next;
    }
    console.log("count", count);
    return count;
  }
  dumpList() {
    let current = this.head;
    while (current) {
      console.log(current);
      current = current.next;
    }
  }
}

class Node {
  data = null;
  next = null;
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }

  setNext(newNext) {
    this.next = newNext;
  }
}
