import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder ,FormsModule,ReactiveFormsModule, Validators} from '@angular/forms';
import { PostsService } from 'src/app/shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';   
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  addForm!: FormGroup;
  submitted! :boolean;

  constructor(
    private fb : FormBuilder,
    private postsService:PostsService,
    private toastrService :ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildAddForm();
  }

  onSubmit(){
    this.submitted = true;
    if (this.addForm.invalid){
      return;
    }
    this.postsService.add(this.addForm.value).subscribe(
      res =>{
        this.toastrService.success("item Added successfully" ,"Success" ,{timeOut:3000 ,closeButton:true , progressBar:true});
        this.router.navigate(['../admin/posts']);
      },
      err=>{
        this.toastrService.error(err.statusText  ,"Error!" ,{timeOut:3000 ,closeButton:true , progressBar:true});
      }
    );
  }
  // to access inputs
  get f(){return this.addForm.controls;}

  buildAddForm(){
    this.addForm = this.fb.group({
      title: [null , Validators.required],
      description : [null, Validators.required]
    });

  }

}
