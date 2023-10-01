import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { medicineServices } from 'src/app/core/services/medicine_services';
import { UserServices } from 'src/app/core/services/user_services';


@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit{
  formSubmitted:boolean = false;
  uploadedImage:any;

  addmedicineForm:FormGroup = new FormGroup({
    title:new FormControl("",[Validators.required,Validators.minLength(3)]),
    description:new FormControl("",[Validators.required,Validators.minLength(5)]),
    price:new FormControl("",[Validators.required]),
    quantity:new FormControl("",[Validators.required]),
    image:new FormControl("",[Validators.required])
  });

  constructor(private userServices:UserServices,private medicineService:medicineServices,
    private router:Router, private toastService:ToastrService) { }

  ngOnInit(): void { 
    setTimeout(() => {
      if(this.userServices.user?.role != 'admin'){
        this.router.navigateByUrl('/');
      }
    }, 2000);
  }

  get title(){ return this.addmedicineForm.get("title"); }
  get description(){ return this.addmedicineForm.get("description"); }
  get price(){ return this.addmedicineForm.get("price"); }
  get quantity(){ return this.addmedicineForm.get("quantity"); }
  get image(){ return this.addmedicineForm.get("image"); }

  addImage(event:any){
    this.uploadedImage = event.target.files[0];
  }

  addmedicine(){
    this.formSubmitted = true;
    if(this.addmedicineForm.valid){
      const formData = new FormData();
      formData.append('medicineImg',this.uploadedImage);
      formData.append('data',JSON.stringify({
        'title': this.title?.value,
        'description': this.description?.value,
        'price': this.price?.value,
        'quantity': this.quantity?.value,
      }));

      this.medicineService.addMedicine(formData).subscribe(
        data => {},
        e=> {console.log(e); this.toastService.error('Failed to add medicine');},
        ()=> {this.toastService.success('medicine added'); this.router.navigateByUrl('/');}
      )
    }
  }

}
