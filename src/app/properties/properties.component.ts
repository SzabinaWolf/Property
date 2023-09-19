import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../shared/property.service';
import { Property } from './properties.model';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  allProperty: any;
  formValue!: FormGroup;
  propertyModelObj: Property = new Property();
  showAdd!: boolean;
  showEdit!: boolean;

  constructor(
    private fb: FormBuilder,
    private api: PropertyService,
    private auth: AuthService
  ) { }


  ngOnInit(): void {
    this.formValue = this.fb.group({
      id: [''],
      ptitle: ['', Validators.required],
      pprice: ['', Validators.required],
      plocation: ['', Validators.required],
      pdetails: ['', Validators.required]
    })
    this.getAllProperty();
  }

  clickAddProp() {
    this.formValue.reset();
    this.showAdd = true;
    this.showEdit = true;
  }



  //get all data
  getAllProperty() {
    this.api.getAllProperty().subscribe((res: any) => {
      this.allProperty = res;
      console.warn(this.allProperty);
    })
  }

  //add property

  addProp() {
    this.propertyModelObj.ptitle = this.formValue.value.ptitle;
    this.propertyModelObj.pprice = this.formValue.value.pprice;
    this.propertyModelObj.plocation = this.formValue.value.plocation;
    this.propertyModelObj.pdetails = this.formValue.value.pdetails;

    this.api.addListing(this.propertyModelObj).subscribe((res) => {
      console.log(res);
      alert("Record added successfully ");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllProperty();
    }, err => {
      alert('Something went wrong')
    })

  }
  deleteProp(data: any) {
    this.api.deleteProperty(data.id).subscribe((res: any) => {
      alert('Property deleted successfully');
      this.getAllProperty();
    })
  }

  onEdit(data: any) {
    this.propertyModelObj.id = data.id;
    this.formValue.controls['ptitle'].setValue(data.ptitle);
    this.formValue.controls['pprice'].setValue(data.pprice);
    this.formValue.controls['plocation'].setValue(data.plocation);
    this.formValue.controls['pdetails'].setValue(data.pdetails);

  }

  updateProp() {
    this.propertyModelObj.ptitle = this.formValue.value.ptitle;
    this.propertyModelObj.pprice = this.formValue.value.pprice;
    this.propertyModelObj.plocation = this.formValue.value.plocation;
    this.propertyModelObj.pdetails = this.formValue.value.pdetails;

    this.api.updateProperty(this.propertyModelObj, this.propertyModelObj.id)
      .subscribe((res) => {
        alert('Updated successfully');
        let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset();
        this.getAllProperty();
      })
  }

  logout() {

    this.auth.logout();
  
  }

}

