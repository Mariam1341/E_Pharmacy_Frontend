import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medicine } from 'src/app/core/models/medicine';
import { medicineServices } from 'src/app/core/services/medicine_services';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit{
  id!: string | null;
  medicine: Medicine | undefined;
  urlImage: string = 'http://localhost:3000/images/';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private medicineServices: medicineServices
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('medicineId');
    if (!this.id) {
      this.toastr.error('Please Enter medicine ID');
      this.router.navigateByUrl('/');
      return;
    }
    this.medicineServices.getSingleMedicine(this.id).subscribe(
      (res) => {
        this.medicine = res.data;
      },
      (e) => {
        this.toastr.error('There is No medicine with that ID');
        this.router.navigateByUrl('/');
        return;
      }
    );
  }
}
