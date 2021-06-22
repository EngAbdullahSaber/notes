import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
 items :any =[];
  constructor(
     private postsServices: PostsService ,
     private modalServices :NgbModal ,
     private toastrService :ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  //get all posts 
  getAll(){
    this.postsServices.getAll().subscribe(res => {
    this.items =res;
    });
  }
  //delete item
  deletItem( modal: any,id: any){
    this.modalServices.open(modal).result.then(result =>{
      this.postsServices.delete(id).subscribe(res =>{
        this.toastrService.success("item deleted successfully" ,"Success" ,{timeOut:3000 ,closeButton:true , progressBar:true});
        this.getAll();
      },
       err=>{
        this.toastrService.error(err.statusText  ,"Error!" ,{timeOut:3000 ,closeButton:true , progressBar:true});
       });



    },reason =>{
      console.log(reason)
    });

    
  }

}
