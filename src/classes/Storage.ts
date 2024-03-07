import { HasSetItem } from "../interfaces/HasSetItem.js";

export class Storage implements HasSetItem {
    oldData: string[] = [];


    constructor(typeValue: string, htmlString: string){
        this.setItem(typeValue, htmlString);
    }

    static checkLocalStorage(): void{
        if(localStorage.getItem('invoice') === null){
            localStorage.setItem('invoice', '[]');
        }

        if(localStorage.getItem('estimate') === null){
            localStorage.setItem('estimate', '[]');
        }
    }

    setItem(typeValue: string, htmlString: string): void {
        let array: string | null; 
        array = localStorage.getItem(typeValue);
        if(array !== null){
            this.oldData = JSON.parse(array);
            this.oldData.push(htmlString);
            localStorage.setItem(typeValue, JSON.stringify(this.oldData));
        } else {
            document.location.reload();
        }
    }
}