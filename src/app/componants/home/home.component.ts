import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medicine } from 'src/app/core/models/medicine';
import { Cart } from 'src/app/core/models/cart';
import { User } from 'src/app/core/models/user';
import { medicineServices } from 'src/app/core/services/medicine_services';
import { CartServices } from 'src/app/core/services/cart_services';
import { UserServices } from 'src/app/core/services/user_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  medicines!: Medicine[];
  tempmedicines!: Medicine[];
  user!: User | null;
  deleteDialogue: boolean = false;
  deletedmedicineId: any;
  searchText:string = "";

  constructor(
    public medicineServices: medicineServices,
    public userServices: UserServices,
    private cartServices: CartServices,
    private router: Router,
    private toastr: ToastrService
  ) {
    medicineServices.getAllMedicines().subscribe((res) => {
      if (!res.success) {
        toastr.error(res.msg);
        return;
      }
      this.medicines = res.data;
      this.tempmedicines = res.data;
    });
  }

  top(id: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.deleteDialogue = true;
    this.deletedmedicineId = id;
  }
  ngOnInit(): void {}

  deletemedicine() {
    this.deleteDialogue = false;
    this.medicineServices.deleteMedicine(this.deletedmedicineId).subscribe(
      (data) =>{
        this.medicines = this.medicines.filter(
          (medicine) => medicine._id != this.deletedmedicineId
        );
      },
      (e) => console.log(e),
      () => {}
    );
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


  searchFun(){
    this.tempmedicines = [...this.medicines];
    
    this.tempmedicines = this.tempmedicines.filter((b)=>{
      let regex = new RegExp(this.searchText,'i');

      return (b.title.search(regex) != -1);
    });
  }
}
