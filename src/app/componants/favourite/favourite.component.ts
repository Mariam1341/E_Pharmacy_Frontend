import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { medicineServices } from 'src/app/core/services/medicine_services';
import { CartServices } from 'src/app/core/services/cart_services';
import { UserServices } from 'src/app/core/services/user_services';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  constructor(private userServices:UserServices, private cartServices:CartServices,
    private toastr: ToastrService, public _medicineServices:medicineServices) { }

  ngOnInit(): void {
  }

  deleteFromFavourite(medicineId:string){
    this._medicineServices.deletemedicineFromFav(medicineId).subscribe(
      (res) => {
        this._medicineServices.favmedicines = this._medicineServices.favmedicines.filter((medicine)=> medicine.medicineId != medicineId);
        const index = this._medicineServices.favmedicinesIds.findIndex((id)=> id == medicineId);
        this._medicineServices.favmedicinesIds.splice(index,1);
        this.toastr.success(res.msg);
      },
      (e) => this.toastr.error(e.msg)
    )
  }

  addCart(medicineId: any,medicineTitle:string,medicineImage:string,medicinePrice:number) {
    if (this.userServices.isLoggedIn) {
      let data = { medicineId, medicineTitle, medicineImage, medicinePrice };
      this.cartServices.addToCart(data).subscribe(
        (res) => this.toastr.success('medicine added to cart'),
        (e) => { console.log(e);
         this.toastr.error('Failed to add medicine to cart')},
        () => {}
      );
    } else {
      this.toastr.error('Please Login to add to cart');
    }
  }

}
