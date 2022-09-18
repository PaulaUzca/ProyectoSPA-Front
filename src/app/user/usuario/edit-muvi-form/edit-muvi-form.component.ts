import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-muvi-form',
  templateUrl: './edit-muvi-form.component.html',
  styleUrls: ['./edit-muvi-form.component.scss']
})
export class EditMuviFormComponent implements OnInit {
  @Input() name: any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
