import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header-component',
  standalone: true,
  imports: [],
  templateUrl: './page-header-component.component.html',
  styleUrl: './page-header-component.component.scss'
})
export class PageHeaderComponent {
  @Input() heading:string = "";
  @Input() spotlight:string = "";
}
