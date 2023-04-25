import { Component } from '@angular/core';
import { ProductImagesServiceService } from './services/product-images-service.service';
import { ActivatedRoute } from '@angular/router';
import { ProductImage } from './models/productImage';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent {

  image: any[] = [];
  productId:number=0;
  productImages:ProductImage[]=[];

  constructor(
    private productImageService:ProductImagesServiceService,
    private activatedRoute:ActivatedRoute,
    private errorService:ErrorService,
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this.productId=res.id;
      this.getList();
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }

  getList(){
    this.productImageService.getList(this.productId).subscribe((res:any)=>{
      this.productImages=res.data;
      console.log(res.data)
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }

  uploadImage() {
    let formData = new FormData();
    formData.append("productId",this.productId.toString());
    for (let i = 0; i< this.image.length; i++) {
      formData.append("Image",this.image[i],this.image[i].name);
    }

    // ProductImageService'e sorgu göndermeden önce, formData içindeki resim sayısını kontrol edebilirsiniz
    if (formData.getAll("Image").length == 0) {
      this.toastrService.error("Resim Seçmediniz.!","Hata");
      return;
    }

    this.productImageService.add(formData).subscribe((res:any)=>{
      this.toastrService.success(res.message);
      this.getList();

      let input = document.getElementById("file") as HTMLInputElement; // Resim yüklendikten sonra inputu temizle.
      input.value = null;
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }

  getImage(event:any){
    this.image=event.target.files
  }


  delete(productImage:ProductImage){
        this.productImageService.delete(productImage).subscribe((res:any)=>{
            location.reload();
            this.getList();
        },(err)=>{
            this.errorService.errorHandler(err);
        });
}


setMainImage(id:number){
  // Resmin sıralama index'ini al
  const imageIndex = this.productImages.findIndex(img => img.id === id);
  // Sadece sıralama index'ini kullanarak ana resmi güncelle
  this.productImages[imageIndex].MainImage = true;
  // Ana resim olarak ayarlanmayan resimlerin isMain özelliğini false yap
  this.productImages.filter(img => img.id !== id).forEach(img => img.MainImage = false);
  // Ana resmi güncellemek için servis çağırımı yap
  this.productImageService.setMainImage(id).subscribe((res:any)=>{
  this.getList();
  },(err)=>{
  this.errorService.errorHandler(err);
  });
  }


}
