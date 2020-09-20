import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DefaultLayoutComponent],
  imports: [CommonModule, NgbModule, RouterModule.forRoot([])],
  exports: [DefaultLayoutComponent],
  bootstrap: [DefaultLayoutComponent],
})
export class ContainersModule {}
