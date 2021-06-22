import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient ,HttpHeaders }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor( private http: HttpClient) { }
  //get all items 
  getAll(){
    return this.http.get(`${environment.apUrl}/posts` );
  }

   //delete item
   delete(id: any){
    return this.http.delete(`${environment.apUrl}/posts/${id}` );
  }
  // add posts
  add(data: any){
    return this.http.post(`${environment.apUrl}/posts`,data );

  }
   // update posts
   update(data: any ,id :any){
    return this.http.put(`${environment.apUrl}/posts/${id}`,data );

  }
    // get item
    getItem(id :any){
      return this.http.get(`${environment.apUrl}/posts/${id}` );
  
    }

}
