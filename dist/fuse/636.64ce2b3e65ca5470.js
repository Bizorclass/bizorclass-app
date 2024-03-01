"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[636],{4636:(R,u,r)=>{r.r(u),r.d(u,{MyClassesModule:()=>o});var g=r(7392),d=r(9299),m=r(4466),h=r(5861),f=r(7579),x=r(2722),e=r(4650),v=r(5830),C=r(7009),_=r(877),p=r(6895);function y(n,s){if(1&n&&(e.TgZ(0,"div"),e._uU(1),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(null==t||null==t.teacher_id?null:t.teacher_id.degree)}}function T(n,s){1&n&&(e.TgZ(0,"div",15)(1,"div",16),e._uU(2," Transfer Request Pending "),e.qZA()())}function A(n,s){1&n&&(e.TgZ(0,"div",15)(1,"div",17),e._uU(2," Transfer Request Reject "),e.qZA()())}function Z(n,s){1&n&&(e.TgZ(0,"div",15)(1,"div",18),e._uU(2," Transfer Request Accept "),e.qZA()())}const I=function(n){return["./","class-details",n]};function S(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",8)(1,"div",9)(2,"img",10),e.NdJ("error",function(i){e.CHM(t);const c=e.oxw(2);return e.KtG(c.onTeacherImgError(i))}),e.qZA(),e.TgZ(3,"div",11),e._uU(4),e.YNc(5,y,2,1,"div",5),e.qZA()(),e.TgZ(6,"div",12)(7,"p")(8,"span",13),e._uU(9,"Date : "),e.qZA(),e._uU(10),e.qZA(),e.TgZ(11,"p")(12,"span",13),e._uU(13,"Time : "),e.qZA(),e._uU(14),e.qZA(),e.TgZ(15,"p")(16,"span",13),e._uU(17,"Address : "),e.qZA(),e._uU(18),e.qZA(),e.YNc(19,T,3,0,"div",14),e.YNc(20,A,3,0,"div",14),e.YNc(21,Z,3,0,"div",14),e.qZA()()}if(2&n){const t=s.$implicit,a=e.oxw(2);e.Q6J("routerLink",e.VKq(11,I,t.order_id)),e.xp6(2),e.Q6J("src",null==t||null==t.teacher_id?null:t.teacher_id.photo_url,e.LSH),e.xp6(2),e.AsE(" ",null==t||null==t.teacher_id?null:t.teacher_id.first_name," ",null==t||null==t.teacher_id?null:t.teacher_id.last_name," "),e.xp6(1),e.Q6J("ngIf",null==t||null==t.teacher_id?null:t.teacher_id.degree),e.xp6(5),e.hij(" ",a.getDateString(t),""),e.xp6(4),e.hij(" ",a.getTimeString(t),""),e.xp6(4),e.hij(" ",t.address,""),e.xp6(1),e.Q6J("ngIf",null==t?null:t.isChangeRequestPending),e.xp6(1),e.Q6J("ngIf",null==t?null:t.isChangeRequestReject),e.xp6(1),e.Q6J("ngIf",null==t?null:t.isChangeRequestAccept)}}function q(n,s){if(1&n&&(e.TgZ(0,"div",6),e.YNc(1,S,22,13,"div",7),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.classesList)}}function M(n,s){1&n&&(e.ynx(0),e.TgZ(1,"div",19),e._uU(2,"No classes scheduled"),e.qZA(),e.BQk())}class l{constructor(s,t,a,i){this._activatedRoute=s,this.apiService=t,this._snackBar=a,this._authService=i,this.isLoading=!0,this._unsubscribeAll=new f.x,this._authService.user.pipe((0,x.R)(this._unsubscribeAll)).subscribe(c=>{c&&c?.student_id&&(this.studentId=c?.student_id,this.getStudentClassesFromServer())})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}getStudentClassesFromServer(){var s=this;return(0,h.Z)(function*(){try{s.isLoading=!0;const t=yield s.apiService.getOngoingOrderByStudentId(s.studentId);console.log("getOrderByStudentIdResponse => ",t),t?.data?(s.classesList=t?.data.map(a=>({...a,isChangeRequestPending:a?.["change-teacher-request"]?.some(i=>"pending"===i?.request_status),isChangeRequestReject:a?.["change-teacher-request"]?.some(i=>"reject"===i?.request_status),isChangeRequestAccept:a?.["change-teacher-request"]?.some(i=>"accept"===i?.request_status)})),console.log("this.classesList => ",s.classesList)):s._snackBar.open(t?.error?.message?t?.error?.message:"Something went wrong! Try again","",{horizontalPosition:"center",verticalPosition:"top",duration:3e3,panelClass:["error-toast"]}),s.isLoading=!1}catch(t){console.error(t),s._snackBar.open(t?.error?.message?t?.error?.message:"Something went wrong! Try again","",{horizontalPosition:"center",verticalPosition:"top",duration:3e3,panelClass:["error-toast"]}),s.isLoading=!1}})()}getDateString(s){return`${new Date(s?.start_date).toDateString()} - ${new Date(s?.end_date).toDateString()}`}getTimeString(s){return`${this.time24to12Convert(s?.start_time)} - ${this.time24to12Convert(s?.end_time)}`}time24to12Convert(s){const[t,a]=s.split(":"),i=+t%24;return(i%12||12)+":"+a+(i<12?" AM":" PM")}onTeacherImgError(s){s.target.src="../../../../assets/images/avatars/dummy user.png"}}l.\u0275fac=function(s){return new(s||l)(e.Y36(d.gz),e.Y36(v.s),e.Y36(C.ux),e.Y36(_.e))},l.\u0275cmp=e.Xpm({type:l,selectors:[["my-classes"]],decls:7,vars:2,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex-auto","p-4","md:p-10","flex","flex-col"],[1,"flex-[1]","rounded-md","w-full","flex","flex-col"],[1,"text-[1.5rem]","font-bold"],["class","myClassesTeacherCardWrapper",4,"ngIf"],[4,"ngIf"],[1,"myClassesTeacherCardWrapper"],["class","cardBox",3,"routerLink",4,"ngFor","ngForOf"],[1,"cardBox",3,"routerLink"],[1,"teacherNameAndImageWrapper"],["alt","",1,"teacherImage",3,"src","error"],[1,"teacherName","text-white"],[1,"classInfoWrapper"],[1,"font-bold"],["class","flex justify-end",4,"ngIf"],[1,"flex","justify-end"],[1,"chipItem","text-white","bg-blue-500"],[1,"chipItem","text-white","bg-red-500"],[1,"chipItem","text-white","bg-green-500"],[1,"noDataWrapper"]],template:function(s,t){1&s&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),e._uU(4,"My Classes"),e.qZA(),e.YNc(5,q,2,1,"div",4),e.YNc(6,M,3,0,"ng-container",5),e.qZA()()()),2&s&&(e.xp6(5),e.Q6J("ngIf",(null==t.classesList?null:t.classesList.length)>0),e.xp6(1),e.Q6J("ngIf",0===(null==t.classesList?null:t.classesList.length)))},dependencies:[d.rH,p.sg,p.O5],styles:[".myClassesTeacherCardWrapper{display:flex;flex-direction:column;flex-wrap:wrap}.myClassesTeacherCardWrapper .cardBox{padding:.5rem;margin:5px 0;border-radius:10px;display:flex;flex-direction:column;background:var(--color-light)!important}.myClassesTeacherCardWrapper .cardBox .teacherNameAndImageWrapper{display:flex;flex-direction:row}.myClassesTeacherCardWrapper .cardBox .teacherNameAndImageWrapper .teacherImage{width:60px;height:60px;object-fit:cover;border-radius:50%;background:white}.myClassesTeacherCardWrapper .cardBox .teacherNameAndImageWrapper .teacherName{font-size:1rem;flex:1;margin:0 0 0 10px!important}.myClassesTeacherCardWrapper .cardBox .classInfoWrapper{display:flex;flex-direction:column;flex:1;color:#fff;margin-top:5px;font-size:.8}.chipItem{width:-moz-fit-content;width:fit-content;border-radius:34px;padding:4px .8rem;font-size:.8rem;margin-top:5px}.noDataWrapper{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:1.1rem}\n"],encapsulation:2});const B=[{path:"",component:l}];class o{}o.\u0275fac=function(s){return new(s||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[d.Bz.forChild(B),m.m,g.Ps]})}}]);