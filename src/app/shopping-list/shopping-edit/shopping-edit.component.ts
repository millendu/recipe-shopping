import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('itemForm') form: NgForm
  subscription: Subscription;
  editMode = false;
  editingItemIndex: number;
  editingItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditting
      .subscribe(
        (id: number) => {
          this.editMode = true;
          this.editingItemIndex = id;
          this.editingItem = this.slService.getIngredient(id);
          this.form.setValue({
            name: this.editingItem.name,
            amount: this.editingItem.amount
          });
        }
      );
  }

  onAddOrUpdateItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editingItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
