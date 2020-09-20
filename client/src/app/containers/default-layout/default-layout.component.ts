import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  // @ViewChild('navbarCollapse', { read: ElementRef })
  // tref: ElementRef;

  public isMenuCollapsed = true;

  constructor() {}

  ngOnInit(): void {}

  // ngAfterViewInit() {
  //   console.log(this.tref.nativeElement.style);
  //   this.tref.nativeElement.style.backgroundColor = '#FF0000';
  // }
}
