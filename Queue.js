export default class Queue {
  head = null;
  tail = null;

  constructor(head = null) {
    this.head = head;
    this.tail = head;
  }

  [Symbol.iterator]() {
    let current = this.tail;

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

  // Add a new node with the given data at the tail of the list
  enqueue(data) {
    const newNode = new Node(data, this.tail);
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
  }

  // Remove the head, loop through the list until final element, and set that to head and remove it's next?
  dequeue() {
    const oldHead = this.head;
    // Do nothing if the list is empty
    if (oldHead) {
      // If there's only one element, clear the list
      if (oldHead == this.tail) {
        this.head = null;
        this.tail = null;
        return oldHead;
      }
      let current = this.tail;
      while (current) {
        if (current.next == oldHead) {
          current.setNext(null);
          this.head = current;
          return oldHead;
        }
        current = current.next;
      }
    }
  }

  peek() {
    return this.head;
  }

  // Index 0 == head? So loop through everything first is required?... and an array makes life a lot better?
  get(index) {
    let current = this.tail;
    const allNodes = [];
    while (current) {
      allNodes.push(current);
      current = current.next;
    }
    // Total - index "reverses" the order. Index 0 indeed becomes the final element
    // -1 is just required since length is 1-indexed but the array itself is 0-indexed
    const reversedIndex = allNodes.length - 1 - index;
    return allNodes[reversedIndex];
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
    let current = this.tail;
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
