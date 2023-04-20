import { NodeI } from './node'

/**
 * Generic class representing a linked list implementation of a Queue
 * @template T the type of data stored in the node
 */
export class Queue<T> {
    private firstNode: NodeI<T> | null;
    private lastNode: NodeI<T> | null;

    /**
     * Creates a new queue with the first and last node being null
     */
    constructor() {
        this.firstNode = null;
        this.lastNode = null;
    }

    /**
     * Adds an entry to the back of the queue
     * @param newEntry the data to be added to the back of the queue
     */
    public enqueue(newEntry: T) : void {
        var newNode: NodeI<T> = new NodeI<T>(newEntry);

        // check if queue is empty
        if (this.isEmpty()) {
            this.firstNode = newNode;
        } else {
            this.lastNode!.setNextNode(newNode);
        }

        this.lastNode = newNode;
    }

    /**
     * Retrieves the front entry of the queue
     * @returns the front entry 
     */
    public peek() : T | null {
        return this.firstNode!.getData();
    }

    /**
     * Dequeues the front entry of the queue
     * @returns the front entry 
     */
    public dequeue() : T | null {
        var front: T | null = this.peek();
        this.firstNode!.setData(null);
        this.firstNode = this.firstNode!.getNextNode();

        if (this.firstNode == null) {
            this.lastNode = null;
        }

        return front;
    }
    
    /**
     * removes a specified entry from the queue
     * @param entry entry to be removed
     * @returns boolean value if the value was removed
     */
    public remove(entry: T) : boolean {
        var curNode: NodeI<T> | null = this.firstNode;
        var prevNode: NodeI<T> | null = null;

        while (curNode) {
            if (curNode.getData() === entry) {
                if (curNode === this.firstNode) {
                    // if item to remove is the front node
                    this.firstNode = curNode.getNextNode();

                    // if queue is now empty
                    if (!this.firstNode) {
                        this.lastNode = null;
                    }
                } else if (curNode === this.lastNode) {
                    // if item to be removed is rear node
                    this.lastNode = prevNode;
                    this.lastNode!.setNextNode(null);
                } else {
                    // if item to be removed is in the middle of the queue
                    prevNode!.setNextNode(curNode.getNextNode());
                }

                return true;
            }

            prevNode = curNode;
            curNode = curNode.getNextNode();
        }

        return false;
    }

    /**
     * Checks if the queue is empty
     * @returns boolean value if the queue is empty
     */
    public isEmpty() : boolean {
        // check if first and last node null
        return (this.firstNode == null) && (this.lastNode == null);
    }
    
    /**
     * clears the queue
     */
    public clear() : void {
        this.firstNode = null;
        this.lastNode = null;
    }
    
    /**
     * Gets the number of entries in the queue
     * @returns number of entries in the queue
     */
    public size() : number {
        var count: number = 0;
        var curNode: NodeI<T> | null = this.firstNode;

        while (curNode != null) {
            count++;
            curNode = curNode.getNextNode();
        }

        return count;
    }

    /**
     * Exports the queue elements into an array
     * @returns an array containing the queue elements in order
     */
    public toArray(): T[] {
        const arr: T[] = [];
        let curNode: NodeI<T> | null = this.firstNode;

        while (curNode != null) {
            const data = curNode.getData();
            if (data != null) {
                arr.push(data);
            }
            curNode = curNode.getNextNode();
        }

        return arr;
    }
}