export class Storage {
    constructor(typeValue, htmlString) {
        this.oldData = [];
        this.setItem(typeValue, htmlString);
    }
    static checkLocalStorage() {
        if (localStorage.getItem('invoice') === null) {
            localStorage.setItem('invoice', '[]');
        }
        if (localStorage.getItem('estimate') === null) {
            localStorage.setItem('estimate', '[]');
        }
    }
    setItem(typeValue, htmlString) {
        let array;
        array = localStorage.getItem(typeValue);
        if (array !== null) {
            this.oldData = JSON.parse(array);
            this.oldData.push(htmlString);
            localStorage.setItem(typeValue, JSON.stringify(this.oldData));
        }
        else {
            document.location.reload();
        }
    }
}
