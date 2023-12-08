import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:9002/api/student/';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addStudent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add`, data);
  }

  updateStudent(studentID: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}update/${studentID}`, data);
  }

  deleteStudent(studentID: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete/${studentID}`);
  }
}
