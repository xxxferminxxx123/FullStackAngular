import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from '../../app/carpeta/student';
import { StudentService } from '../../app/services/student.service';



@Component({
  selector: 'app-customer-component',
  templateUrl: './customer-component.component.html',
  styleUrls: ['./customer-component.component.scss']
})
export class CustomerComponentComponent implements OnInit{
  studentArray: Student[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  stname = '';
  course = '';
  fee = '';
  currentStudentID = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe((resultData: any) => {
      this.isResultLoaded = true;
      console.log(resultData.data);
      this.studentArray = resultData.data;
    });
  }

  register() {
    const bodyData = {
      stname: this.stname,
      course: this.course,
      fee: this.fee,
    };

    this.studentService.addStudent(bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert('Student Registered Successfully');
      this.getAllStudents();
    });
  }

  setUpdate(data: Student) {
    this.stname = data.stname;
    this.course = data.course;
    this.fee = data.fee;
    this.currentStudentID = data.id;
  }

  updateRecords() {
    const bodyData = {
      stname: this.stname,
      course: this.course,
      fee: this.fee,
    };

    this.studentService
      .updateStudent(this.currentStudentID, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Updated Successfully');
        this.getAllStudents();
      });
  }

  save() {
    if (this.currentStudentID === '') {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: Student) {
    this.studentService.deleteStudent(data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert('Student Deleted Successfully');
      this.getAllStudents();
    });
  }
 
}
