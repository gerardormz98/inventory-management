import { ElementRef, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openConfirmDeleteModal(objectDescription: string, confirmCallback: () => void) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Confirmar borrado';
    modalRef.componentInstance.bodyHTML = `¿Estás seguro de que quieres borrar: <b>${objectDescription}</b>? Ya no podrá ser utilizado para futuras operaciones.`;
    modalRef.componentInstance.confirmText = 'Borrar';

    modalRef.result.then(value => {
      if (value === "Confirm") {
        confirmCallback();
      }
    }, () => {});
  }
}
