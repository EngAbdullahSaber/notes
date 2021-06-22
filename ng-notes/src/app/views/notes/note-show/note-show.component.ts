import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from 'src/app/shared/services/notes.service';
import { EventEmitter } from '@angular/core';
interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-note-show',
  templateUrl: './note-show.component.html',
  styleUrls: ['./note-show.component.css']
})

export class NoteShowComponent implements OnInit {
  
  itemDetails :any;
  @Input() itemId :any;
  @Output() items = new EventEmitter<any>();
  addForm! :FormGroup; 
  constructor( 
    private fb:FormBuilder,
    private toastrService :ToastrService,
    private noteServices :NotesService,
    private activateRoute :ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getItem();
    
    this.buildAddForm();


  }
  getItem(){
    this.noteServices.getItem(this.itemId).subscribe(res =>{
      this.itemDetails= res;

    });
  }

  buildAddForm(){
    this.addForm = this.fb.group({
      id :'',
      title: [null , Validators.required],
      description : [null, Validators.required]
    });

  }

  getItemDetails(id:any){
    this.noteServices.getItem(id).subscribe(res =>{
      this.itemDetails =res;
    });
  }
  onSubmit(id:any){
   if(id===''){
     this.addItem(this.addForm.value)
   }else{
     this.updateItem(this.addForm.value ,id);
   }
  }

  addItem(data:any){
    this.noteServices.add(data).subscribe(res =>{
      this.toastrService.success("item Added successfully" ,"Success" ,{timeOut:3000 ,closeButton:true , progressBar:true});
      this.getItems();
    },
    err =>{
      this.toastrService.error(err.statusText  ,"Error!" ,{timeOut:3000 ,closeButton:true , progressBar:true});

    })
  }

  updateItem(data:any ,id:any){
    this.noteServices.update(data ,id).subscribe(res =>{
      this.toastrService.success("item updated successfully" ,"Success" ,{timeOut:3000 ,closeButton:true , progressBar:true});
      this.getItems();
    },
    err =>{
      this.toastrService.error(err.statusText  ,"Error!" ,{timeOut:3000 ,closeButton:true , progressBar:true});

    })
  }

getItems(){
  this.noteServices.getAll().subscribe( res=>{
    this.items.emit(res);
  });
}

}
