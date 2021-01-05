class Node {
  next = null;
  prev = null;
  constructor(value) {
    this.value = value;
  }
}

class List {
  head = null;
  tail = null;
  map = new Map();
  add(node) {
    this.map.set(node.value, node);
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;

      return;
    }

    const oldTail = this.tail;
    this.tail = node;
    node.prev = oldTail;
    oldTail.next = node;
    node.next = this.head;
  }

  toArray() {
    const result = [];
    let node = this.head;
    do {
      result.push(node.value);
      node = node.next;
    } while (node != this.head);

    return result;
  }

  findNode(value) {
    return this.map.get(value);
  }

  removeNode(value) {
    const node = this.findNode(value);
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.map.delete(node.value);

    return node;
  }
  insertNode(positionValue, mergingNode) {
    const destinationNode = this.findNode(positionValue);
    mergingNode.next = destinationNode.next;
    destinationNode.next.prev = mergingNode;
    destinationNode.next = mergingNode;
    mergingNode.prev = destinationNode;

    this.map.set(mergingNode.value, mergingNode);
  }

  mergeThree(start, values) {
    const [first, second, third] = values;
    this.insertNode(start, new Node(first));
    this.insertNode(first, new Node(second));
    this.insertNode(second, new Node(third));
  }

  yankThree(start) {
    const first = this.findNode(start).next;
    const second = first.next;
    const third = second.next;

    this.removeNode(first.value);
    this.removeNode(second.value);
    this.removeNode(third.value);

    return [first.value, second.value, third.value];
  }
}

module.exports = { List, Node };
