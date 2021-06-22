import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {


  constructor( private http: HttpClient) { }
  //get all items 
  getAll(){
    return this.http.get(`${environment.apUrl}/notes` );
  }

   //delete item
   delete(id: any){
    return this.http.delete(`${environment.apUrl}/notes/${id}` );
  }
  // add posts
  add(data: any){
    return this.http.post(`${environment.apUrl}/notes`,data );

  }
   // update posts
   update(data: any ,id :any){
    return this.http.put(`${environment.apUrl}/notes/${id}`,data );

  }
    // get item
    getItem(id :any){
      return this.http.get(`${environment.apUrl}/notes/${id}` );
  
    }

}
