import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() bodyHTML: string = '';
  @Input() confirmText: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
