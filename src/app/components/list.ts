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

    public isEmpty() : boolean{

        if (this.size==0){
            return true;
        }

        else{
            return false;
        }
    }

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

    public partnerUp(data1: T, data2: T, addTo: linkedList<T>) : boolean{
        if (this.remove(data1) && this.remove(data2)){
            if(addTo.add(data1) && addTo.add(data2)){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}
