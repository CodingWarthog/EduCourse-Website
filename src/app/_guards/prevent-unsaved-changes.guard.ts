import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UsersInfoUpdateComponent } from '../users/users-info-update/users-info-update.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<UsersInfoUpdateComponent> {
canDeactivate(component: UsersInfoUpdateComponent) {
  if (component.updateForm.dirty) {
    return confirm('Are you sure');
  }
  return true;
}
}
