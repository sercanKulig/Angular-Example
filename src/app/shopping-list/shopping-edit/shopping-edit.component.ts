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
  constId: number;


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
    const constIdValue = this.sls.getIngredientsLastId();
    if (constIdValue !== false) {
      this.constId = constIdValue;
    } else {
      this.constId = 1;
    }
    if (this.editMode) {
      const newIngredient = new Ingredient(value.id, value.name, value.amount);
      this.sls.updateIngredient(value.id, newIngredient)
    } else {
      const newIngredient = new Ingredient(this.constId, value.name, value.amount);
      this.sls.addIngredient(newIngredient);
    }
    this.onReset();
  }

  onReset() {
    this.slForm.resetForm();
    this.editMode = false;
  }

  onDelete() {
    this.sls.deleteIngredient(this.editedItemIndex);
    this.onReset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
