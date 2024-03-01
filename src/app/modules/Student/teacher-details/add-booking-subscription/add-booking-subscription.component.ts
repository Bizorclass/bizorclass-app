import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
// declare const Razorpay: any;
declare const Instamojo: any;

import { Checkout } from 'capacitor-razorpay';
// import { Geolocation } from '@capacitor/geolocation';
// import {} from '@types/googlemaps';


declare const google: any;


@Component({
  selector: 'add-booking-subscription',
  templateUrl: './add-booking-subscription.component.html',
  styleUrls: ['add-booking-subscription.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBookingSubscriptionComponent implements OnInit, OnDestroy {

  teacher_id: string;
  teacherDetails: any;

  orderId: string;
  orderDetails: any;

  student_id: string;
  user: any;

  startDate: string;
  endDate: string;
  booking_type: string = "single";
  group_details: string[] = [];
  address: string;
  latitude: string;
  longitude: string;

  selectedScheduleId: string;
  selectedScheduleDetails: any;

  subscriptionsList: any[];
  selectedSubscriptionId: string;
  selectedSubscriptionPlanDetails: any;

  courseList: any[];
  selectedCourseId: string;
  // selectedCourseDetails: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  isLoading = false;

  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   plugins: [interactionPlugin, dayGridPlugin],
  //   dateClick: (e) => this.handleDateClick(e),
  //   businessHours: {
  //     // days of week. an array of zero-based day of week integers (0=Sunday)
  //     daysOfWeek: [], // Monday - Thursday
  //     display: 'background',
  //     color: '#8fdf82',
  //   },
  //   // events: [
  //   //   { title: 'event 1', date: '2023-03-01' },
  //   //   { title: 'event 2', date: '2023-03-02' },
  //   //   {
  //   //     start: '2023-03-10',
  //   //     // end: '2023-03-11T12:30:00',
  //   //     title: 'Booked',
  //   //     display: 'background',
  //   //     color: '#fa8072',
  //   //     overlap: true,
  //   //   }
  //   // ],
  //   height: 'auto',
  // };

  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiService, private _authService: AuthService, private _changeDetectorRef: ChangeDetectorRef, private _snackBar: MatSnackBar, private _router: Router) {
    this._activatedRoute.params.subscribe(async params => {
      this.teacher_id = params["teacher_id"];
      this.orderId = params["orderId"];
      console.log(this.teacher_id);

      if (this.teacher_id) {
        // this.getScheduleByScheduleIdFromServer();
        await this.getTeacherFromServer();
        // await this.getAllSubscriptionsFromServer();
        await this.getAllCourseFromServer();
      }
      if (this.orderId) {
        // this.getScheduleByScheduleIdFromServer();
        await this.getOrderFromServer();
      }
    });
    this._authService.user.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: any) => {
      console.log({ user });
      if (user && user?.student_id) {
        this.user = user;
        this.student_id = user?.student_id;
        this.address = user?.home_address || "";
        // this.getAllSubscriptionsFromServer();
      }
    });
  }
  ngOnInit(): void {
    this.initMap();
  }

  async initMap() {
    const getLatitudeLongitudeResponse: any = await this.getLatitudeLongitude();
    // let map;
    // if (getLatitudeLongitudeResponse.success && getLatitudeLongitudeResponse?.latitude && getLatitudeLongitudeResponse?.longitude) {
    //   map = new google.maps.Map(document.getElementById('map-container'), {
    //     center: { lat: getLatitudeLongitudeResponse?.latitude, lng: getLatitudeLongitudeResponse?.longitude }, // Set the initial center of the map
    //     zoom: 12 // Set the initial zoom level
    //   });
    // } else {
    //   map = new google.maps.Map(document.getElementById('map-container'), {
    //     center: { lat: 20.5937, lng: 78.9629 }, // Set the initial center of the map
    //     zoom: 12 // Set the initial zoom level
    //   });
    // }

    // // Add a click event listener to the map
    // map.addListener('click', (event) => {
    //   // Retrieve the latitude and longitude from the clicked location
    //   console.log("event -> ", event);

    //   const { lat, lng } = event.latLng;

    //   // Create a geocoder instance
    //   const geocoder = new google.maps.Geocoder();

    //   // Perform a reverse geocoding request
    //   geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    //     if (status === 'OK' && results[0]) {
    //       // Extract the formatted address from the results
    //       const address = results[0].formatted_address;

    //       // Do something with the address (e.g., display it on the page)
    //       console.log('Address:', address);
    //     } else {
    //       console.error('Geocoder failed due to:', status);
    //     }
    //   });
    // });

    //todo ----------    TRY 2
    // let map: any;
    // let marker: any;
    // let infoWindow: any;

    // const [{ Map }, { AdvancedMarkerView }] = await Promise.all([
    //   google.maps.importLibrary("marker"),
    //   google.maps.importLibrary("places")
    // ]);

    // // Initialize the map.
    // map = new google.maps.Map(document.getElementById('map-container') as HTMLElement, {
    //   center: { lat: 40.749933, lng: -73.98633 },
    //   zoom: 13,
    //   mapId: '4504f8b37365c3d0',
    //   mapTypeControl: false,
    // });
    // // Create the input HTML element, and add it to the map as a custom control.
    // const input = document.createElement('input') as HTMLInputElement;
    // input.id = 'pac-input';
    // const options = {
    //   // bounds: defaultBounds,
    //   componentRestrictions: { country: "ind" },
    //   fields: ["address_components", "geometry", "icon", "name"],
    //   strictBounds: false,
    //   types: ["establishment"],
    // };

    // //@ts-ignore
    // // const pac = new google.maps.places.PlaceAutocompleteElement({ inputElement: input });

    // const pac = new google.maps.places.Autocomplete({ inputElement: input });
    // console.log("pac -> ", pac);


    // const card = document.getElementById('pac-card') as HTMLElement;
    // card.appendChild(pac.element as HTMLElement);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    // // Create the marker and infowindow
    // marker = new google.maps.marker.AdvancedMarkerView({
    //   map,
    // });

    // infoWindow = new google.maps.InfoWindow({});

    // // Add the gmp-placeselect listener, and display the results on the map.
    // pac.addListener('gmp-placeselect', async ({ place }) => {
    //   await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });

    //   // If the place has a geometry, then present it on a map.
    //   if (place.viewport) {
    //     map.fitBounds(place.viewport);
    //   } else {
    //     map.setCenter(place.location);
    //     map.setZoom(17);
    //   }

    //   let content = '<div id="infowindow-content">' +
    //     '<span id="place-displayname" class="title">' + place.displayName + '</span><br />' +
    //     '<span id="place-address">' + place.formattedAddress + '</span>' +
    //     '</div>';

    //   this.updateInfoWindow(infoWindow, content, place.location, map, marker);
    //   marker.position = place.location;
    // });


    //todo --------------------           TRY 3


    let _lat, _lng;
    if (getLatitudeLongitudeResponse.success && getLatitudeLongitudeResponse?.latitude && getLatitudeLongitudeResponse?.longitude) {
      _lat = getLatitudeLongitudeResponse?.latitude;
      _lng = getLatitudeLongitudeResponse?.longitude;
    } else {
      _lat = 20.5937;
      _lng = 78.9629;
    }
    const map = new google.maps.Map(
      document.getElementById("map-container") as HTMLElement,
      {
        center: { lat: _lat, lng: _lng },
        zoom: 13,
        mapTypeId: "roadmap",
      }
    );


    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input") as HTMLInputElement;
    // console.log("input", input);

    const searchBox = new google.maps.places.SearchBox(input);
    console.log(google.maps.ControlPosition.TOP_LEFT);


    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      console.log("places -> ", places);

      if (places.length == 0) {
        return;
      }

      this.address = places[0].formatted_address;
      this.longitude = places[0].geometry.location.lng();
      this.latitude = places[0].geometry.location.lat();

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);

      this._changeDetectorRef.detectChanges();
    });

  }

  updateInfoWindow(infoWindow, content, center, _map, _marker) {
    infoWindow.setContent(content);
    infoWindow.setPosition(center);
    infoWindow.open({
      _map,
      anchor: _marker,
      shouldFocus: false,
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  //   getScheduleByScheduleIdFromServer() {
  //     this.apiService.getScheduleByScheduleId(this.schedule_id).subscribe(async (getScheduleByScheduleIdResponse: any) => {
  //       console.log(getScheduleByScheduleIdResponse);
  //       //todo update Object
  //       if (getScheduleByScheduleIdResponse.data) {
  //         this.teacherDetails = getScheduleByScheduleIdResponse.data.teacher_id;
  //         this.scheduleDetails = getScheduleByScheduleIdResponse.data;
  //         console.log(this.teacherDetails);
  //         console.log(this.scheduleDetails);

  //         let days = getScheduleByScheduleIdResponse.data.days.map(m => this.getWeekNumber(m));
  //         console.log({ days });
  //         this.calendarOptions.businessHours = {
  //           // days of week. an array of zero-based day of week integers (0=Sunday)
  //           daysOfWeek: days, // Monday - Thursday
  //           display: 'background',
  //           color: '#8fdf82',
  //         }

  //         this._changeDetectorRef.detectChanges();
  //       }
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   }

  async getTeacherFromServer() {
    const getTeacherByIdResponse: any = await this.apiService.getTeacherById(this.teacher_id).toPromise()
    //  subscribe(async (getTeacherByIdResponse: any) => {
    console.log(getTeacherByIdResponse);
    //todo update Object
    if (getTeacherByIdResponse.data) {
      let _teacherObject = Array.isArray(getTeacherByIdResponse.data) ? getTeacherByIdResponse.data[0] : getTeacherByIdResponse.data;
      console.log(_teacherObject);
      this.teacherDetails = _teacherObject;
    } else {
      console.error("getTeacherByIdResponse => ", getTeacherByIdResponse);
    }
    // }, (err) => {
    //   console.log(err);
    // });
  }

  async getAllSubscriptionsFromServer() {
    if (this.teacher_id && this.student_id) {
      const getAllSubscriptionsResponse: any = await this.apiService.getStudentSubscribedToTeacherPlan(this.teacher_id, this.student_id).toPromise();
      // .subscribe(async (getAllSubscriptionsResponse: any) => {
      //todo update Object
      if (getAllSubscriptionsResponse.data) {
        let _subscriptionsList = getAllSubscriptionsResponse.data.map(m => ({ ...m, isConnected: Boolean(m['subscription-teacher-user']?.length) }));
        this.subscriptionsList = [..._subscriptionsList];

        console.log(this.subscriptionsList);
        this._changeDetectorRef.markForCheck();

      } else {
        console.log(getAllSubscriptionsResponse);
      }
      // }, (err) => {
      //   console.log(err);
      // });
    }
  }
  async getAllCourseFromServer() {
    try {
      const getCourseByTeacherIdResponse: any = await this.apiService.getCourseByTeacherId(this.teacher_id).toPromise();
      // console.log("getCourseByTeacherIdResponse => ", getCourseByTeacherIdResponse);
      if (getCourseByTeacherIdResponse.data) {
        let _data = getCourseByTeacherIdResponse.data.map(m => m?.subject_id?.course_id)?.filter(f => f?.is_course_active);
        let _courseList = _data.reduce((tempArr, pre) => {
          if (!tempArr?.some(s => s.course_id === pre.course_id)) {
            return [...tempArr, pre];
          } else {
            return tempArr;
          }
        }, []);

        this.courseList = _courseList;
        console.log(_courseList);
      } else {
        throw getCourseByTeacherIdResponse;
      }
    } catch (error) {
      console.error(error);
      if (error?.error?.message) {
        this._snackBar.open(error?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      } else {
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      }
    }
  }

  async getOrderFromServer() {
    try {
      const getOrderByIdResponse: any = await this.apiService.getOrderById(this.orderId);
      console.log("getOrderByIdResponse => ", getOrderByIdResponse);
      if (getOrderByIdResponse.data) {
        this.orderDetails = getOrderByIdResponse.data;

        this.booking_type = this.orderDetails?.booking_type;
        this.address = this.orderDetails?.address;
        this.selectedSubscriptionId = this.orderDetails?.subscription_teacher_user_id?.subscription_plan_id;
        this.selectedCourseId = this.orderDetails?.course_id;
        this.onChangeCourse(this.selectedCourseId, true);
        console.log("selectedSubscriptionId => ", this.selectedSubscriptionId);

        // this.onChangeSubscription(this.orderDetails?.subscription_teacher_user_id?.subscription_plan_id);
        this._changeDetectorRef.detectChanges();
      } else {
        throw getOrderByIdResponse;
      }
    } catch (error) {
      console.error(error);
      if (error?.error?.message) {
        this._snackBar.open(error?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      } else {
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      }
    }
  }

  onChangeSchedule(_output) {
    console.log(_output.value);
    if (this.teacherDetails?.schedule.some(s => s.schedule_id == _output.value)) {
      this.selectedScheduleDetails = this.teacherDetails?.schedule.find(s => s.schedule_id == _output.value);

      let days = this.selectedScheduleDetails.days.map(m => this.getWeekNumber(m));
      console.log({ days });
      // this.calendarOptions.businessHours = {
      //   // days of week. an array of zero-based day of week integers (0=Sunday)
      //   daysOfWeek: days, // Monday - Thursday
      //   display: 'background',
      //   color: '#8fdf82',
      // }
      this.startDate = "";
      this.endDate = "";
      // this.calendarOptions.events = [];

      this._changeDetectorRef.detectChanges();
    }
  }

  scheduleDateFilter = (d: Date | null): boolean => {
    // console.log(d);
    const day = (new Date(d) || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    // console.log(day);
    const scheduleDays = this.teacherDetails?.schedule?.find(s => s.schedule_id == this.selectedScheduleId)?.days?.map(m => this.getWeekNumber(m)) || null;
    // console.log("scheduleDays => ", scheduleDays);
    
    return scheduleDays ? (scheduleDays.some(s => s === day) && Boolean(new Date(d) > new Date())) : false;
    // return day !== 0 && day !== 6;
  };

  onChangeSubscription(_output) {
    if (_output && !_output.value) {
      _output = { value: _output };
    }
    console.log(_output.value);
    this.selectedSubscriptionPlanDetails = this.subscriptionsList.find(s => s.subscription_plan_id == _output.value);
    if (this.selectedSubscriptionPlanDetails) {
      this.startDate = "";
      this.endDate = "";
      // this.calendarOptions.events = [];

      this._changeDetectorRef.detectChanges();
    }
  }

  onChangeCourse(_output, isSelectedSubscriptionSkip: boolean) {
    //* clear selected subscription
    if (!isSelectedSubscriptionSkip) {
      this.subscriptionsList = [];
      this.selectedSubscriptionId = null;
      this.selectedSubscriptionPlanDetails = null;
    }

    //* clear selected Schedule
    this.selectedScheduleId = null;
    this.selectedScheduleDetails = null;

    if (_output && !_output.value) {
      _output = { value: _output };
    }
    console.log(_output.value);

    if (this.courseList?.some(s => s.course_id == _output.value)) {
      this.subscriptionsList = this.courseList?.find(s => s.course_id == _output.value)?.['subscription-plan'];

      console.log("this.subscriptionsList => ", this.subscriptionsList);

      this.startDate = "";
      this.endDate = "";
      // this.calendarOptions.events = [];

      this._changeDetectorRef.detectChanges();
    }
  }

  // handleDateClick(arg) {
  //   console.log('arg => ', arg);
  //   console.log('date click => ' + arg.dateStr);
  handleDateClick(_event) {
    console.log('_event => ', _event);
    console.log('date click => ' + _event.targetElement.value);

    const arg = {
      dateStr: _event.targetElement.value,
    }

    if (!this.selectedCourseId) {
      this._snackBar.open("Please select course.", "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        // panelClass: ['success-toast']
        panelClass: ['error-toast']
      });
      return;
    }

    if (!this.selectedSubscriptionId) {
      this._snackBar.open("Please select subscription.", "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        // panelClass: ['success-toast']
        panelClass: ['error-toast']
      });
      return;
    }

    if (!this.selectedScheduleId) {
      this._snackBar.open("Please select schedule time.", "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        // panelClass: ['success-toast']
        panelClass: ['error-toast']
      });
      return;
    }

    // todo Check Min Date
    var check = new Date(arg.dateStr);
    var today = new Date();
    if (!Boolean(check > today)) {
      this._snackBar.open("Please choose a future date.", "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        // panelClass: ['success-toast']
        panelClass: ['error-toast']
      });
      return;
    }

    if (this.selectedScheduleDetails.days.some(s => s === this.getWeekName(new Date(arg.dateStr).getDay()))) {
      this.startDate = arg.dateStr;
      //   this.endDate = arg.dateStr;
      this.endDate = new Date(new Date(arg.dateStr).setDate(new Date(arg.dateStr).getDate() + this.selectedSubscriptionPlanDetails?.duration_days)).toISOString().slice(0, 10);

      // this.calendarOptions.events = [{
      //   start: this.startDate,
      //   end: this.endDate,
      //   title: 'Select',
      //   display: 'background',
      //   color: '#fa8072',
      //   overlap: true,
      //   className: "selectedDate"
      // }]
    } else {
      this.startDate = "";
      this.endDate = "";

      // this.calendarOptions.events = [];
      this._snackBar.open("Please select available date.", "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        // panelClass: ['success-toast']
        panelClass: ['error-toast']
      })
    }
    this._changeDetectorRef.detectChanges();
  }

  async processToBook() {

    const postBody = {
      start_date: this.startDate,
      end_date: this.endDate,
      start_time: this.selectedScheduleDetails.start_time,
      end_time: this.selectedScheduleDetails.end_time,
      teacher_id: this.teacher_id,
    }

    const addReviewResponse: any = await this.apiService.checkBookTeacherScheduleSlot(postBody);
    console.log("addReviewResponse => ", addReviewResponse);

    if (addReviewResponse.success) {

      //todo ---> Create order ID
      const razorpayCreateOrderIdResponse: any = await this.apiService.razorpayCreateOrderId(this.getPrice() * 100);
      console.log("razorpayCreateOrderIdResponse => ", razorpayCreateOrderIdResponse);
      if (!razorpayCreateOrderIdResponse?.success) {
        if (addReviewResponse?.description) {
          this._snackBar.open(addReviewResponse?.description, "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 4000,
            //   panelClass: ['success-toast']
            panelClass: ['error-toast']
          });
        } else {
          this._snackBar.open("Something went wrong! Try again", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000,
            // panelClass: ['success-toast']
            panelClass: ['error-toast']
          })
        }
        return;
      }

      var options: any = {
        "key": environment.razorpay_Key,
        order_id: razorpayCreateOrderIdResponse?.id,
        "amount": this.getPrice() * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Bizorclass",
        "description": "Subscribe to " + this.selectedSubscriptionPlanDetails?.title,
        // "image": "https://example.com/your_logo",
        // "handler": this.razorpayResponse,
        "prefill": {
          "name": this.user?.first_name + ' ' + this.user?.last_name,
          "email": this.user?.email,
          "contact": this.user?.phone_number
        },
        theme: {
          color: '#b5245f'
        }
      }
      //   this.processForRazorpay(options);

      try {
        console.log("razorpay options => ", options);

        let data = (await Checkout.open(options));
        console.log(data);
        // console.log(JSON.stringify(data))
        this.razorpayResponse(data.response, razorpayCreateOrderIdResponse?.id);
      } catch (error) {
        //it's paramount that you parse the data into a JSONObject
        let errorObj = JSON.parse(error['code'])
        console.log(errorObj);

        if (errorObj?.description) {
          this._snackBar.open(errorObj?.description, "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 4000,
            //   panelClass: ['success-toast']
            panelClass: ['error-toast']
          });
        } else {
          this._snackBar.open("Something went wrong! Try again", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000,
            // panelClass: ['success-toast']
            panelClass: ['error-toast']
          })
        }

        // alert(errorObj.description);
        // alert(errorObj.code);

        // alert(errorObj.reason);
        // alert(errorObj.step);
        // alert(errorObj.source);
        // alert(errorObj.metadata.order_id);
        // alert(errorObj.metadata.payment_id);

      }

    } else {
      if (addReviewResponse?.error?.message) {
        this._snackBar.open(addReviewResponse?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 4000,
          //   panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      } else {
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      }
    }

  }
  processForRazorpay(options: any) {
    // var rzp1 = new Razorpay(options);
    // rzp1.on('payment.failed', this.paymentFailed);
    // rzp1.open();
  }

  paymentFailed = (paymentFailedResponse: any) => {
    console.log("paymentFailed => ", paymentFailedResponse);

    // this.alertToastService.ToastWithMessageColorDuration(paymentFailedResponse.error.description, 'danger', 2000);
    alert(paymentFailedResponse.error.description);
  }

  razorpayResponse = async (paymentResponse: any, order_id: string) => {
    console.log(paymentResponse.razorpay_payment_id);
    // this.subscriptionService.subscription_plan_connect_with_user(this.user.uid, this.selectedPlan, paymentResponse).then(res => {
    //   this.alertToastService.ToastWithMessageColorDuration('Subscription Connect success', 'success', 2000);
    //   this.getUserSubscriptionData();
    // }).catch(err => {
    //   console.log(err);
    // //   this.alertToastService.ToastWithMessageColorDuration('Something went wrong! Try again.', 'danger', 2000);
    //   alert('Something went wrong! Try again.');
    // })

    let postBody = {
      teacher_id: this.teacher_id,
      student_id: this.student_id,
      subscription_plan_id: this.selectedSubscriptionPlanDetails?.subscription_plan_id,
      total_price: this.getPrice(),
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      razorpay_order_id: order_id
    }

    try {
      const studentSubscribeToPlanResponse: any = await this.apiService.studentSubscribeToPlan(postBody);
      console.log("studentSubscribeToPlanResponse => ", studentSubscribeToPlanResponse);

      if (studentSubscribeToPlanResponse?.data) {
        // this._snackBar.open("Plan connected successfully.", "", {
        //   horizontalPosition: "center",
        //   verticalPosition: "top",
        //   duration: 3000,
        //   panelClass: ['success-toast']
        //   // panelClass: ['error-toast']
        // });
        this.addBooking(studentSubscribeToPlanResponse?.data?.subscription_teacher_user_id);
      } else if (studentSubscribeToPlanResponse?.error?.message) {
        //! studentSubscribeToPlanResponse?.error?.message
        this._snackBar.open(studentSubscribeToPlanResponse?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      } else {
        //! Something went wrong! Try again
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      }

    } catch (error) {
      console.error(error);
      if (error?.error?.message) {
        this._snackBar.open(error?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      } else {
        //! Something went wrong! Try again
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      }
    }
  }

  async addBooking(subscriptionTeacherUserId) {
    this.isLoading = true;
    this._changeDetectorRef.detectChanges();

    const postBody = {
      start_date: this.startDate,
      end_date: this.endDate,
      start_time: this.selectedScheduleDetails.start_time,
      end_time: this.selectedScheduleDetails.end_time,
      student_id: this.student_id,
      teacher_id: this.teacher_id,
      schedule_id: this.selectedScheduleId,
      booking_type: this.booking_type,
      group_details: this.group_details,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      subscription_teacher_user_id: subscriptionTeacherUserId,
      course_id: this.selectedCourseId,
    }
    console.log(postBody);

    try {
      const addReviewResponse: any = await this.apiService.bookTeacherScheduleSlot(postBody);
      console.log("addReviewResponse => ", addReviewResponse);

      if (addReviewResponse?.data) {
        this._snackBar.open("Slot booking successfully.", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          panelClass: ['success-toast']
          // panelClass: ['error-toast']
        });

        this._router.navigate(['../']);
      } else if (addReviewResponse?.error?.message) {
        //! addReviewResponse?.error?.message
        this._snackBar.open(addReviewResponse?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      } else {
        //! Something went wrong! Try again
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      }
      this.isLoading = false;
      this._changeDetectorRef.detectChanges();
    } catch (error) {
      console.error(error);
      if (error?.error?.message) {
        this._snackBar.open(error?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      } else {
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      }
      this.isLoading = false;
      this._changeDetectorRef.detectChanges();
    }
  }

  async instaMojo() {

    const postBody = {
      start_date: this.startDate,
      end_date: this.endDate,
      start_time: this.selectedScheduleDetails.start_time,
      end_time: this.selectedScheduleDetails.end_time,
      teacher_id: this.teacher_id,
    }

    const checkBookTeacherScheduleSlotResponse: any = await this.apiService.checkBookTeacherScheduleSlot(postBody);
    console.log("checkBookTeacherScheduleSlotResponse => ", checkBookTeacherScheduleSlotResponse);

    if (checkBookTeacherScheduleSlotResponse.success) {
      try {
        const createInstamojoPaymentRequestResponse:any = await this.apiService.createInstamojoPaymentRequest(this.getPrice(), this.user?.first_name, this.user?.email, this.user?.phone_number)
        console.log("createInstamojoPaymentRequestResponse => ", createInstamojoPaymentRequestResponse);
  
        if (createInstamojoPaymentRequestResponse?.data?.longurl) {
          Instamojo.configure({
            amount: 10,
            handlers: {
              onOpen: (response) => this.InstamojoOnOpen(response),
              onSuccess: (response) => this.InstamojoOnSuccess(response),
              onFailure: (response) => this.InstamojoOnFailure(response)
            }
          });
          Instamojo.open(createInstamojoPaymentRequestResponse?.data?.longurl);
        } else {
          throw createInstamojoPaymentRequestResponse;
        }      
      } catch (error) {
        console.error(error);
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      }
    } else {
      if (checkBookTeacherScheduleSlotResponse?.error?.message) {
        this._snackBar.open(checkBookTeacherScheduleSlotResponse?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 4000,
          //   panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      } else {
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      }
    }

    
    // try {
    //   const instaMojoAppResponse = await Browser.open({ url: 'https://www.instamojo.com/@bizorclass/' });

    //   console.log("instaMojoAppResponse => ", instaMojoAppResponse);
    // } catch (error) {
    //   console.log(error);
      
    // }
  }

  async InstamojoOnSuccess(instaMojoResponse) {
    console.log("InstamojoOnSuccess => ", instaMojoResponse);
    console.log("InstamojoOnSuccess paymentId => ", instaMojoResponse?.paymentId);
    
    let postBody = {
      teacher_id: this.teacher_id,
      student_id: this.student_id,
      subscription_plan_id: this.selectedSubscriptionPlanDetails?.subscription_plan_id,
      total_price: this.getPrice(),
      razorpay_payment_id: instaMojoResponse?.paymentId,
      razorpay_order_id: instaMojoResponse?.paymentId
    }

    try {
      const studentSubscribeToPlanResponse: any = await this.apiService.studentSubscribeToPlan(postBody);
      console.log("studentSubscribeToPlanResponse => ", studentSubscribeToPlanResponse);

      if (studentSubscribeToPlanResponse?.data) {
        // this._snackBar.open("Plan connected successfully.", "", {
        //   horizontalPosition: "center",
        //   verticalPosition: "top",
        //   duration: 3000,
        //   panelClass: ['success-toast']
        //   // panelClass: ['error-toast']
        // });
        this.addBooking(studentSubscribeToPlanResponse?.data?.subscription_teacher_user_id);
      } else if (studentSubscribeToPlanResponse?.error?.message) {
        //! studentSubscribeToPlanResponse?.error?.message
        this._snackBar.open(studentSubscribeToPlanResponse?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      } else {
        //! Something went wrong! Try again
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      }

    } catch (error) {
      console.error(error);
      if (error?.error?.message) {
        this._snackBar.open(error?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      } else {
        //! Something went wrong! Try again
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        });
      }
    }
  }

  InstamojoOnFailure(instaMojoResponse) {
    console.log("InstamojoOnFailure => ", instaMojoResponse);
    this._snackBar.open("Payment failure! Try again", "", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000,
      // panelClass: ['success-toast']
      panelClass: ['error-toast']
    })
  }

  InstamojoOnOpen(InstamojoOnOpenResponse) {
    console.log("InstamojoOnOpenResponse => ", InstamojoOnOpenResponse);
    
  }
  
  async processToChangeTeacher() {
    this.isLoading = true;
    this._changeDetectorRef.detectChanges();

    const postBody = {
      order_id: this.orderId,
      old_teacher_id: this.orderDetails?.teacher_id?.teacher_id,
      old_start_date: this.orderDetails?.start_date,
      old_end_date: this.orderDetails?.end_date,
      old_start_time: this.orderDetails?.start_time,
      old_end_time: this.orderDetails?.end_time,
      old_schedule_id: this.orderDetails?.schedule_id,
      new_teacher_id: this.teacher_id,
      new_start_date: this.startDate,
      new_end_date: this.endDate,
      new_start_time: this.selectedScheduleDetails.start_time,
      new_end_time: this.selectedScheduleDetails.end_time,
      new_schedule_id: this.selectedScheduleId,
    }
    console.log(postBody);

    try {
      const sendChangeRequestResponse: any = await this.apiService.sendChangeRequest(postBody);
      console.log("sendChangeRequestResponse => ", sendChangeRequestResponse);

      if (sendChangeRequestResponse?.data) {
        this._snackBar.open("Transfer request sent successfully.", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          panelClass: ['success-toast']
          // panelClass: ['error-toast']
        });

        this._router.navigate(['student', 'home']);
      } else if (sendChangeRequestResponse?.error?.message) {
        //! sendChangeRequestResponse?.error?.message
        this._snackBar.open(sendChangeRequestResponse?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      } else {
        //! Something went wrong! Try again
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      }
      this.isLoading = false;
      this._changeDetectorRef.detectChanges();
    } catch (error) {
      console.error(error);
      if (error?.error?.message) {
        this._snackBar.open(error?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      } else {
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      }
      this.isLoading = false;
      this._changeDetectorRef.detectChanges();
    }
  }

  changeGroupType(_groupType: string) {
    if (this.orderId) {
      return;
    }
    if (_groupType === "single") {
      this.group_details = [];
    } else {
      this.group_details = [`${this.user?.first_name} ${this.user?.last_name}`];
    }
  }

  inputChange(i, event) {
    console.log(event.target.value);

    this.group_details[i] = event.target.value;
  }

  addStudentField() {
    this.group_details.push("");
  }

  removeStudentField(i) {
    this.group_details.splice(i, 1);
  }

  isBookButtonDisable() {
    if (this.booking_type === "single") {
      return !Boolean(this.startDate && this.endDate && this.address && this.longitude && this.latitude);
    } else {
      if (!this.group_details.length) {
        return true;
      } else {
        let flag = false;
        this.group_details.forEach(ele => {
          if (!ele) {
            flag = true;
          }
        })
        if (!Boolean(this.startDate && this.endDate && this.address && this.longitude && this.latitude)) {
          flag = true;
        }
        return flag;
      }
    }
  }

  getPrice() {
    if (this.booking_type === "single") {
      return this.selectedSubscriptionPlanDetails?.price;
    } else {
      return this.selectedSubscriptionPlanDetails?.price * this.group_details.length;
    }
  }

  getActiveSchedules() {
    return this.teacherDetails?.schedule?.filter(f => f?.is_active) || [];
  }

  getWeekNumber(str: string) {
    const arr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return arr.findIndex(f => f === str);
  }
  getWeekName(num: number) {
    const arr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return arr[num];
  }
  onTeacherImgError(event) {
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }
  getLatitudeLongitude() {
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     const coordinates = await Geolocation.getCurrentPosition();
    //     console.log('Current position:', coordinates.coords.latitude);
    //     console.log('Current position:', coordinates.coords.longitude);
    //     resolve({
    //       success: true,
    //       latitude: coordinates.coords.latitude,
    //       longitude: coordinates.coords.longitude
    //     });
    //   } catch (error) {
    //     console.error("error -> ", error);
    //     resolve({ success: false });
    //   }

    // })

    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log('Latitude:', latitude);
              console.log('Longitude:', longitude);
              // Do something with the coordinates
              resolve({
                success: true,
                latitude: latitude,
                longitude: longitude
              });
            },
            (error) => {
              console.log('Error:', error.message);
              resolve({ success: false });
              // Handle error gracefully
            }
          );
        } else {
          console.log('Geolocation is not supported by this browser.');
          // Handle browser not supporting geolocation
        }

    })
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }

  getDateString(_date) {
    return new Date(_date).toDateString();
  }
}
