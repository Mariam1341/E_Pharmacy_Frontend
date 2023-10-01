import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { medicineServices } from 'src/app/core/services/medicine_services';
import { CartServices } from 'src/app/core/services/cart_services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData: any[] = [];
  totalPrice!: number;
  urlImage: string = 'http://localhost:3000/images/';

  constructor(
    private medicineServices: medicineServices,
    private cartServices: CartServices,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartServices.getCart().subscribe(
      (res) => {
        this.cartData = res.medicines;
        this.totalPrice = res.totalPrice;
      },
      (e) => console.log(e),
      () => {}
    );
  }

  incrementCount(countInput:any){
    countInput.value++;
  }

  decrementCount(countInput:any){
    if(countInput.value >1){
      countInput.value--;
    }
  }

  changeCountFun(countInput:any,medicineId:string){
    let medicineCount = Number(countInput.value);
    if(typeof medicineCount == "number" && medicineCount>0){
      let data = {medicineCount};
      this.cartServices.changemedicineCount(data,medicineId).subscribe(
        (res)=>{
          this.toastr.success(res.msg); 
          this.totalPrice = res.totalPrice;
          this.cartData = res.medicines;
        },
        (e)=>console.log(e) 
      )
    }
  }

  deleteFromCart(medicineId:string,medicinePrice:number,medicineCount:number) {
    this.cartServices.deleteCart(medicineId,medicineCount,medicinePrice).subscribe(
      (res) => {
        this.toastr.success(res.msg);
        this.cartData = this.cartData.filter((medicine)=>medicine.medicineId != medicineId);
        this.totalPrice = res.data.totalPrice;
      },
      (e)=>{
        this.toastr.error(e.msg);
      }
      );
  }

  checkout(cartmedicines: any[], totalPrice: number) {
    let today = new Date();
    let todaymonth = String(today.getMonth()+1).padStart(2,'0');
    const data = {
      products: cartmedicines,
      totalPrice,
      dateCreated: today.getFullYear()+"-"+todaymonth+"-"+today.getDate(),
    };
    this.cartServices.checkOut(data).subscribe(
      (res) => {
        this.toastr.success(res.msg);
        this.router.navigateByUrl(`/`);
      },
      (e) =>{
        this.toastr.error(e.msg);
        this.router.navigateByUrl('/');
      }
    );
  }
}
