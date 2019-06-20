import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDyrektywa]'
})
export class DyrektywaDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

    @Input() set appDyrektywa(time: number) {
      setTimeout(() => {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }, time);
    }
}
