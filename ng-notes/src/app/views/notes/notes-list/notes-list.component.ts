import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/shared/services/notes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
 items: any =[];
 itemId:any;
  constructor(
    private noteServices :NotesService,
    private modalservices :NgbModal,
    private toaster :ToastrService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

   //get all posts 
   getAll(){
    this.noteServices.getAll().subscribe(res => {
    this.items =res;
    });
  }
  //delete item
  deletItem( modal: any,id: any){
    this.modalservices.open(modal).result.then(result =>{
      this.noteServices.delete(id).subscribe(res =>{
        this.toaster.success("item deleted successfully" ,"Success" ,{timeOut:3000 ,closeButton:true , progressBar:true});
        this.getAll();
      },
       err=>{
        this.toaster.error(err.statusText  ,"Error!" ,{timeOut:3000 ,closeButton:true , progressBar:true});
       });



    },reason =>{
      console.log(reason)
    });

    
  }


  open(content: any , id: any) {
    this.modalservices.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      console.log(reason);
    });
    this.itemId=id;

  }
  
  getUploadedItems(upItmes :any){
    this.items = upItmes;
    this.modalservices.dismissAll();

  }
}
