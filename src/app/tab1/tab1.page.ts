import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogService } from '../input-dialog-service.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  title = 'Groceries'
  groceries = [];
  errorMessage: string;

  constructor(
    public toastCtrl: ToastController,
    public groceryDataService: GroceriesServiceService,
    public inputDialogService: InputDialogService,
  ) {
    this.loadGroceryItems();
    groceryDataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadGroceryItems();
    });
  }

  loadGroceryItems() {
    this.groceryDataService.getItems()
    .subscribe(
      groceries => this.groceries = groceries,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      error => this.errorMessage = <any>error
    );
  }

  async addItem() {
    this.inputDialogService.addItem();
  }

  async editItem(groceryItem) {
    this.inputDialogService.editItem(groceryItem);
  }

  async removeItem(groceryItem) {
    const toast = await this.toastCtrl.create({
      message: `Removing ${groceryItem.name} from the grocery list.`,
      duration: 3000
    });
    toast.present();

    // eslint-disable-next-line no-underscore-dangle
    this.groceryDataService.removeItem(groceryItem._id);
  }

}