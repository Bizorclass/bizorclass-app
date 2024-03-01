import { Component, ViewEncapsulation, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  courses: any[] = [];
  bannerImages: string[] = [];
  teacherList: any[];

  constructor(private apiService: ApiService) {
    this.getAllCourseWithSubjectFromServer();
    this.getBannerImagesFromServer();
    this.getTeacherListFromServer();
  }

  ngAfterViewInit() {
    const courseSwiper = new Swiper('#course-swiper', {
      direction: 'horizontal',
      slidesPerView: 5,
      spaceBetween: 20,
      modules: [Navigation, Pagination],
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 40
        },
        1000: {
          slidesPerView: 6,
          spaceBetween: 40
        }
      }
    });
    const bannerSwiper = new Swiper('#banner-swiper', {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 20,
      modules: [Navigation, Pagination],
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    });
  }

  async getAllCourseWithSubjectFromServer() {
    const getAllCourseWithSubjectForStudentResponse: any = await this.apiService.getAllCourseWithSubjectForStudent();
    // console.log(getAllCourseWithSubjectForStudentResponse);
    if (getAllCourseWithSubjectForStudentResponse?.data) {
      this.courses = getAllCourseWithSubjectForStudentResponse.data;
    }
  }

  getBannerImagesFromServer() {
    // this.isLoading = true;
    this.apiService.getBannerImages().subscribe(async (getBannerImagesResponse: any) => {
    //   console.log(getBannerImagesResponse);
      if (getBannerImagesResponse.data) {
        this.bannerImages = getBannerImagesResponse.data;
        // console.log("bannerImages => ", this.bannerImages);
      } else {
        // !! error handle
      }
      // this.isLoading = false;
    }, (err) => {
      console.log(err);
      // this.isLoading = false;
    });
  }

  getTeacherListFromServer() {
    // this.isLoading = true;
    this.apiService.getTeacherListForStudent().subscribe(async (getTeacherListResponse: any) => {
    //   console.log(getTeacherListResponse);
      if (getTeacherListResponse.data) {
        this.teacherList = getTeacherListResponse.data.map(m => {
          return ({...m, rating: (m.review.reduce((e,ar) => e+ar.rating_star || 0, 0)/m.review?.length || 0).toFixed(1)})
        });;
        console.log("teacherList => ", this.teacherList);
      } else {
        // !! error handle
      }
      // this.isLoading = false;
    }, (err) => {
      console.log(err);
      // this.isLoading = false;
    });
  }




  getRandomIconForCourse(index) {
    const iconsArray = ["book", "menu_book", "science", "biotech", "memory", "miscellaneous_services", "stacked_bar_chart", "travel_explore", "translate", "yard"];
    return `mat_outline:${iconsArray[index%10]}`;
  }

  onTeacherImgError(event){
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }
}
