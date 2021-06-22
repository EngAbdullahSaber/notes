import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import {FormGroup, FormBuilder ,FormsModule,ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  itemId :any;
  itemDetails :any;
  addForm!: FormGroup;
  submitted! :boolean;
  constructor(
    private fb : FormBuilder,
    private postsService:PostsService,
    private toastrService :ToastrService,
    private router: Router,
    private activateRoute :ActivatedRoute
  ) { }

  ngOnInit(): void {
  //get item data id 
  this.activateRoute.params.subscribe( params =>{
    this.itemId =params.id;
    this.postsService.getItem(params.id).subscribe(res =>{
      this.itemDetails= res;

    });
  });
  this.buildEditForm();
  }


  get f(){return this.addForm.controls;}

  buildEditForm(){
    this.addForm = this.fb.group({
      title: [null , Validators.required],
      description : [null, Validators.required]
    });

  }


  onSubmit(){
    this.submitted = true;
    if (this.addForm.invalid){
      return;
    }
    this.postsService.update(this.addForm.value ,this.itemId).subscribe(
      res =>{
        this.toastrService.success("item Added successfully" ,"Success" ,{timeOut:3000 ,closeButton:true , progressBar:true});
        this.router.navigate(['../admin/posts']);
      },
      err=>{
        this.toastrService.error(err.statusText  ,"Error!" ,{timeOut:3000 ,closeButton:true , progressBar:true});
      }
    );
  }

}

