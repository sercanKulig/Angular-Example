import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {Ingredient} from '../../models/ingredient.model';
import {ShoppingListService} from "../../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.sls.startedEditing
      .subscribe(
        (id: number) => {
          this.editedItemIndex = id;
          this.editMode = true;
          this.editedItem = this.sls.getIngredient(id - 1);
          this.slForm.setValue({
            id: this.editedItem.id,
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const id = this.sls.getIngredients()[this.sls.getIngredients().length - 1].id + 1;
    if (this.editMode) {
      const newIngredient = new Ingredient(value.id, value.name, value.amount);
      this.sls.updateIngredient(value.id, newIngredient)
    } else {
      const newIngredient = new Ingredient(id, value.name, value.amount);
      this.sls.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.resetForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
