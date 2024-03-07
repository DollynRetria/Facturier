//import { HasHtmlFormat } from "../interfaces/HasHtmlFormat";
//import { Datas } from "./Datas";
import { Datas } from '../classes/Datas.js';
import { Display } from './Display.js';
import { Print } from './Print.js';
export class FormInput {
    constructor() {
        this.form = document.getElementById('form');
        this.type = document.getElementById('type');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.address = document.getElementById('address');
        this.country = document.getElementById('country');
        this.town = document.getElementById('town');
        this.zip = document.getElementById('zip');
        this.product = document.getElementById('product');
        this.price = document.getElementById('price');
        this.quantity = document.getElementById('quantity');
        this.tva = document.getElementById('tva');
        this.docContainer = document.getElementById('document-container');
        this.hiddenDiv = document.getElementById('hiddenDiv');
        this.storedEl = document.getElementById('stored-data');
        this.btnPrint = document.getElementById('print');
        this.btnReload = document.getElementById('reload');
        this.btnStoredInvoices = document.getElementById('stored-invoices');
        this.btnStoredEstimates = document.getElementById('stored-estimates');
        //Listeners
        this.submitFormListener();
        this.printListener(this.btnPrint, this.docContainer);
        this.deleteListener(this.btnReload);
        this.getStoredDocsListener();
    }
    //Listeners
    submitFormListener() {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    printListener(btn, docContainer) {
        btn.addEventListener('click', () => {
            let availableDoc;
            availableDoc = new Print(docContainer);
            availableDoc.print();
        });
    }
    deleteListener(btn) {
        btn.addEventListener('click', () => {
            document.location.reload();
            window.scrollTo(0, 0);
        });
    }
    getStoredDocsListener() {
        this.btnStoredInvoices.addEventListener('click', this.getItems.bind(this, 'invoice'));
        this.btnStoredEstimates.addEventListener('click', this.getItems.bind(this, 'estimate'));
    }
    getItems(docType) {
        if (this.storedEl.hasChildNodes()) {
            this.storedEl.innerHTML = "";
        }
        if (localStorage.getItem(docType)) {
            let array;
            array = localStorage.getItem(docType);
            if (array !== null && array.length > 2) {
                let arrayData;
                arrayData = JSON.parse(array);
                arrayData.map((doc) => {
                    let card = document.createElement('div');
                    let cardBody = document.createElement('div');
                    let cardClasses = ['card', 'mt-5'];
                    let cardBodyClasses = 'card-body';
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(cardBodyClasses);
                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storedEl.append(card);
                });
            }
            else {
                this.storedEl.innerHTML = '<div class="p-5">Aucune data disponible</div>';
            }
        }
    }
    handleFormSubmit(e) {
        e.preventDefault();
        const inputs = this.InputDatas();
        if (Array.isArray(inputs)) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            //console.log(type, firstname, lastName, address, country, town,  zip, product, price, quantity, tva);
            let docData;
            let date = new Date();
            //docData = new Datas(this.type, this.firstName, this.lastName, this.address, this.country, this.town,  this.zip, this.product, this.price, this.quantity, this.tva, date);
            docData = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);
            console.log(docData.htmlFormat());
            let template;
            template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
            template.render(docData, type);
        }
    }
    InputDatas() {
        const type = this.type.value;
        const firstname = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [type, firstname, lastName, address, country, town, zip, product, price, quantity, tva];
        }
        else {
            alert('Les valeurs numériques doivent être > 0');
            return;
        }
    }
}
