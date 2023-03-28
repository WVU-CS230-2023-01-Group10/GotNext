/** 
 * generic clast for a linked iist
 * 
 * @template T
*/
import { NodeI } from "./node";

export class linkedList<T> {
    private head: NodeI<T> | null;
    private size: number;


//There's only an empty constructor for the list
    constructor(){
        this.head = null;
        this.size = 0;
    }




/**
 * adds an element to the end of the list
 * 
 * @param data 
 * @returns true if the adding was a success, false if a duplicate is found
 */
    public add(data: T) : boolean{
        if (this.isEmpty()){
            this.head = new NodeI<T>(data);
            this.size++;
            return true;
        }
        else{
            for( var i: NodeI<T> | null = this.head; i?.getNextNode() != null; i = i?.getNextNode()  ){
                if (i.getData() == data){
                    return false;
                }

            };
            i?.setNextNode(new NodeI<T>(data));
            this.size++;
            return true;

        }
    }


    /**basic is empty function
     * 
     * @returns true if the list is empty, false otherwise
     */
    public isEmpty() : boolean{

        if (this.size==0){
            return true;
        }

        else{
            return false;
        }
    }

    /**searches for an removes a specific element by its data
     * 
     * @param data specific data element to be removed
     * @returns  true if removal was sucessful, false otherwise
     */
    public remove(data: T) : boolean{
        if (this.isEmpty()){
            return false;
        }

        
         if(this.head?.getData() == data){
            this.head = this.head.getNextNode();
            this.size--;
            return true;
         }
         else if ((this.size == 1) && (this.head?.getData()!=data)){
            return false;
         }

        else{

            for( var i: NodeI<T> | null = this.head; i?.getNextNode() != null; i = i?.getNextNode()  ){
                if(i?.getNextNode()?.getData() == data){
                    
                    i.setNextNode((i.getNextNode()?.getNextNode() ?? null));
                    this.size--;
                    return true;
                }

            }
            return false;
        }

    }

    /** this function was in our component documentation as get, supposed to be here to move people from an unpartnered list to a partnered one or something like that.
     * I changed the name to partnerUp for now
     * @param data1 first data to move
     * @param data2 second data to move
     * @param addTo list for data to be moved to
     * @returns true if all operations are successful
     */
    public partnerUp(data1: T, data2: T, addTo: linkedList<T>) : boolean{
        if (this.isEmpty()){
            return false;
        }

      if ((this.find(data1)!=-1) && (this.find(data2)!=-1) && (addTo.find(data2)==-1) && (addTo.find(data2)==-1)){
        this.remove(data1);
        this.remove(data2);
        addTo.add(data1);
        addTo.add(data2);
        return true;
      }
      else{
        return false;
      }
    }



    /**used to find an element's index if it has one, otherwise
     * 
     * @param data data to find an index of
     * @returns the index of where the element was found, -1 if not found. I don't use this in add or remove because it would end up doing a double traversal, and
     * I also wrote this function after I wrote add and remove...
     */
    public find(data: T): number{

        if (this.isEmpty()){
            return -1;
        }
        var count: number = 0;
        

        for( var i: NodeI<T> | null = this.head; i != null; i = i?.getNextNode()){
            if (i.getData() == data){
                return count;
            }
            count++;
        }
        return -1;
    }
}



