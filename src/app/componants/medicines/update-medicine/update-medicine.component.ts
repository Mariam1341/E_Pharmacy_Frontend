import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medicine } from 'src/app/core/models/medicine';
import { medicineServices } from 'src/app/core/services/medicine_services';

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css']
})
export class UpdateMedicineComponent implements OnInit{

  formSubmitted:boolean = false;
  uploadedImage:any;
  medicine!:Medicine;
  medicineId:any;

  updatemedicineForm:FormGroup = new FormGroup({
    title:new FormControl("",[Validators.required,Validators.minLength(3)]),
    description:new FormControl("",[Validators.required,Validators.minLength(5)]),
    price:new FormControl("",[Validators.required]),
    quantity:new FormControl("",[Validators.required]),
    image:new FormControl("")
  });
  
  constructor(private medicineService:medicineServices,private activatedRoute:ActivatedRoute,
    private toastService:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.medicineId = this.activatedRoute.snapshot.params["medicineId"];
    
    this.medicineService.getSingleMedicine(this.medicineId).subscribe(
      res=> this.medicine = res.data,
      e=> {console.log(e); this.toastService.error('Invalid medicine ID')},
      ()=>{ 
       let {title,description,price,quantity} = this.medicine; 
       this.updatemedicineForm.patchValue({title,description,price,quantity}); }
    )
    
  }

  get title(){ return this.updatemedicineForm.get("title"); }
  get description(){ return this.updatemedicineForm.get("description"); }
  get price(){ return this.updatemedicineForm.get("price"); }
  get quantity(){ return this.updatemedicineForm.get("quantity"); }
  get image(){ return this.updatemedicineForm.get("image"); }

  addImage(event:any){
    this.uploadedImage = event.target.files[0];
  }

  updatemedicine(){
    this.formSubmitted = true;
    if(this.updatemedicineForm.valid){
      const formData = new FormData();
      if(this.uploadedImage) formData.append('medicineImg',this.uploadedImage);
      formData.append('data',JSON.stringify({
        'title': this.title?.value,
        'description': this.description?.value,
        'price': this.price?.value,
        'quantity': this.quantity?.value,
      }));

      this.medicineService.updateMedicine(this.medicineId,formData).subscribe(
        data => {},
        e=> {console.log(e); this.toastService.error('Failed to update medicine');},
        ()=> {this.toastService.success('medicine Updated'); this.router.navigateByUrl('/');}
      )
    }
  }

}
