/**
 * Generic class representing a node
 * @template T the type of data stored in the node
 */
export class NodeI<T> {
    private data: T | null;
    private next: NodeI<T> | null;

    /**
     * Creates a new node with a null reference to the next node
     * @param data the data to be stored in the node
     */
    constructor(data: T) {
        this.data = data;
        this.next = null;
    }

    /**
     * setter method to set next node
     * @param node node to be set to the next node
     */
    public setNextNode(node: NodeI<T> | null) : void {
        this.next = node;
    }

    /**
     * setter method to set data
     * @param data data to be set as data
     */
    public setData(data: T | null) : void {
        this.data = data;
    }

    /**
     * getter method for next node
     * @returns next node
     */
    public getNextNode() : NodeI<T> | null {
        return this.next;
    }

    /**
     * getter method for data
     * @returns data
     */
    public getData() : T | null {
        return this.data;
    }
}