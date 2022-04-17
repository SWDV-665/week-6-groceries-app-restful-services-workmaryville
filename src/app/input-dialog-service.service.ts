import { Injectable } from '@angular/core';
import { GroceriesServiceService } from './groceries-service.service';;
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public groceryDataService: GroceriesServiceService, public alertController: AlertController) { }

  async addItem() {
    const alert = await this.alertController.create({
      header: 'Add a Grocery Item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name of grocery item'
        },
       
        {
          name: 'quantity',
          type: 'number',
          min: 0,
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: (data) => {
            this.groceryDataService.addItem(data);
          }
        }
      ]
    });
    await alert.present();
  }

  async editItem(groceryItem) {
    const alert = await this.alertController.create({
      header: `Edit ${groceryItem.name}`,
      inputs: [
        {
          name: 'name',
          value: groceryItem.name,
          type: 'text',
          placeholder: 'Name of grocery item'
        },
        {
          name: 'quantity',
          value: groceryItem.quantity,
          type: 'number',
          min: 0,
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Update',
          handler: (data) => {
            // eslint-disable-next-line no-underscore-dangle
            this.groceryDataService.editItem(groceryItem._id, data);
          }
        }
      ]
    });
    await alert.present();
  }
}