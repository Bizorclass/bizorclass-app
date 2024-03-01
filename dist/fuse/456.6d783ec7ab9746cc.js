"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[456],{1456:(Lt,w,r)=>{r.r(w),r.d(w,{AdminsModule:()=>_});var m=r(9299),h=r(4859),J=r(6709),C=r(3238),F=r(9602),O=r(4850),d=r(9549),Z=r(7392),T=r(284),D=r(9506),U=r(8255),N=r(3162),Y=r(1948),S=r(4385),y=r(3267),M=r(7155),j=r(266),R=r(79),E=r(4466),t=r(4650);class p{canDeactivate(n,e,a,o){let l=o.root;for(;l.firstChild;)l=l.firstChild;return!(o.url.includes("/admins")&&!l.paramMap.get("id"))||n.closeDrawer().then(()=>!0)}}p.\u0275fac=function(n){return new(n||p)},p.\u0275prov=t.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"});class x{constructor(){}}x.\u0275fac=function(n){return new(n||x)},x.\u0275cmp=t.Xpm({type:x,selectors:[["admins"]],decls:1,vars:0,template:function(n,e){1&n&&t._UZ(0,"router-outlet")},dependencies:[m.lC],encapsulation:2,changeDetection:0});var f=r(6895),s=r(4006),I=r(7579),Q=r(2722),B=r(4968),z=r(9300),L=r(5830),H=r(4880);const q=["matDrawer"];function G(i,n){if(1&i&&(t.ynx(0),t._uU(1),t.BQk()),2&i){const e=t.oxw();t.xp6(1),t.hij(" ",null==e.adminList?null:e.adminList.length," ")}}function K(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"div",26),t._uU(2),t.qZA(),t.BQk()),2&i){const e=t.oxw().$implicit;t.xp6(2),t.hij(" ",e.first_name.charAt(0)," ")}}function W(i,n){if(1&i&&(t.ynx(0),t._UZ(1,"img",27),t.BQk()),2&i){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("src",null==e?null:e.photo_url,t.LSH)}}function V(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"div",28),t._uU(2),t.qZA(),t.BQk()),2&i){const e=t.oxw().$implicit;t.xp6(2),t.hij(" ",e.first_name.charAt(0)," ")}}const $=function(i,n){return{"hover:bg-gray-100 dark:hover:bg-hover":i,"bg-primary-50 dark:bg-hover":n}},P=function(i){return["./",i]};function X(i,n){if(1&i&&(t.ynx(0),t.YNc(1,K,3,1,"ng-container",9),t.TgZ(2,"a",21)(3,"div",22),t.YNc(4,W,2,1,"ng-container",9),t.YNc(5,V,3,1,"ng-container",9),t.qZA(),t.TgZ(6,"div",23)(7,"div",24),t._uU(8),t.qZA(),t.TgZ(9,"div",25),t._uU(10),t.qZA()()(),t.BQk()),2&i){const e=n.$implicit,a=n.index,o=t.oxw(3);t.xp6(1),t.Q6J("ngIf",0===a||e.first_name.charAt(0)!==o.adminList[a-1].first_name.charAt(0)),t.xp6(1),t.Q6J("ngClass",t.WLB(7,$,!o.selectedContact||o.selectedContact.id!==e.admin_id,o.selectedContact&&o.selectedContact.id===e.admin_id))("routerLink",t.VKq(10,P,e.admin_id)),t.xp6(2),t.Q6J("ngIf",null==e?null:e.photo_url),t.xp6(1),t.Q6J("ngIf",!(null!=e&&e.photo_url)),t.xp6(3),t.hij(" ",e.first_name+" "+e.last_name," "),t.xp6(2),t.hij(" ",null==e?null:e.email," ")}}function tt(i,n){if(1&i&&(t.ynx(0),t.YNc(1,X,11,12,"ng-container",20),t.BQk()),2&i){const e=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",e.adminList)("ngForTrackBy",e.trackByFn)}}function et(i,n){if(1&i&&(t.ynx(0),t.YNc(1,tt,2,2,"ng-container",19),t.BQk()),2&i){const e=t.oxw(),a=t.MAs(27);t.xp6(1),t.Q6J("ngIf",null==e.adminList?null:e.adminList.length)("ngIfElse",a)}}function nt(i,n){1&i&&(t.TgZ(0,"div",29),t._uU(1," There are no admins! "),t.qZA())}const it=function(){return{"=0":"No admins","=1":"adminItem",other:"admins"}};class g{constructor(n,e,a,o,l,c){this._activatedRoute=n,this._changeDetectorRef=e,this.apiService=a,this._document=o,this._router=l,this._fuseMediaWatcherService=c,this.adminServerList=null,this.adminList=null,this.searchInputControl=new s.p4,this._unsubscribeAll=new I.x}ngOnInit(){this.getAdminListFromServer(),this.searchInputControl.valueChanges.subscribe(n=>{this.adminList=this.adminServerList.map(e=>({...e,name:`${e.first_name} ${e.last_name}`.toLowerCase()})).filter(e=>e.name.includes(n.toLowerCase()))}),this.matDrawer.openedChange.subscribe(n=>{n||(this.selectedContact=null,this._changeDetectorRef.markForCheck())}),this._fuseMediaWatcherService.onMediaChange$.pipe((0,Q.R)(this._unsubscribeAll)).subscribe(({matchingAliases:n})=>{this.drawerMode=n.includes("lg")?"side":"over",this._changeDetectorRef.markForCheck()}),(0,B.R)(this._document,"keydown").pipe((0,Q.R)(this._unsubscribeAll),(0,z.h)(n=>(!0===n.ctrlKey||n.metaKey)&&"/"===n.key)).subscribe(()=>{this.createContact()})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}getAdminListFromServer(){this.apiService.getAdmins().subscribe(n=>{console.log(n),n.data&&(this.adminList=[...n.data],this.adminServerList=[...n.data],this._changeDetectorRef.markForCheck())},n=>{console.log(n)})}onBackdropClicked(){this._router.navigate(["./"],{relativeTo:this._activatedRoute}),this._changeDetectorRef.markForCheck()}createContact(){this._router.navigate(["./","createAdmin"],{relativeTo:this._activatedRoute})}trackByFn(n,e){return e.id||n}}g.\u0275fac=function(n){return new(n||g)(t.Y36(m.gz),t.Y36(t.sBO),t.Y36(L.s),t.Y36(f.K0),t.Y36(m.F0),t.Y36(H.T))},g.\u0275cmp=t.Xpm({type:g,selectors:[["admins-list"]],viewQuery:function(n,e){if(1&n&&t.Gf(q,7),2&n){let a;t.iGM(a=t.CRH())&&(e.matDrawer=a.first)}},decls:28,vars:17,consts:[[1,"absolute","inset-0","flex","flex-col","min-w-0","overflow-hidden"],[1,"flex-auto","h-full","bg-card","dark:bg-transparent",3,"backdropClick"],[1,"w-full","md:w-160","dark:bg-gray-900",3,"mode","opened","position","disableClose"],["matDrawer",""],[1,"flex","flex-col"],[1,"flex-auto"],[1,"flex","flex-col","sm:flex-row","md:flex-col","flex-auto","justify-between","py-8","px-6","md:px-8","border-b"],[1,"text-4xl","font-extrabold","tracking-tight","leading-none"],[1,"ml-0.5","font-medium","text-secondary"],[4,"ngIf"],[1,"flex","items-center","mt-4","sm:mt-0","md:mt-4"],["subscriptSizing","dynamic",1,"fuse-mat-dense","fuse-mat-rounded","w-full","min-w-50"],["matPrefix","",1,"icon-size-5",3,"svgIcon"],["matInput","",3,"formControl","autocomplete","placeholder"],["mat-flat-button","",1,"ml-4",3,"color","click"],[3,"svgIcon"],[1,"ml-2","mr-1"],[1,"relative"],["noAdmins",""],[4,"ngIf","ngIfElse"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"z-20","flex","items-center","px-6","py-4","md:px-8","cursor-pointer","border-b",3,"ngClass","routerLink"],[1,"flex","flex-0","items-center","justify-center","w-10","h-10","rounded-full","overflow-hidden"],[1,"min-w-0","ml-4"],[1,"font-medium","leading-5","truncate"],[1,"leading-5","truncate","text-secondary"],[1,"z-10","sticky","top-0","-mt-px","px-6","py-1","md:px-8","border-t","border-b","font-medium","uppercase","text-secondary","bg-gray-50","dark:bg-gray-900"],["alt","Contact avatar",1,"object-cover","w-full","h-full",3,"src"],[1,"flex","items-center","justify-center","w-full","h-full","rounded-full","text-lg","uppercase","bg-gray-200","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"p-8","sm:p-16","border-t","text-4xl","font-semibold","tracking-tight","text-center"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"mat-drawer-container",1),t.NdJ("backdropClick",function(){return e.onBackdropClicked()}),t.TgZ(2,"mat-drawer",2,3),t._UZ(4,"router-outlet"),t.qZA(),t.TgZ(5,"mat-drawer-content",4)(6,"div",5)(7,"div",6)(8,"div")(9,"div",7),t._uU(10," Admins "),t.qZA(),t.TgZ(11,"div",8),t.YNc(12,G,2,1,"ng-container",9),t._uU(13),t.ALo(14,"i18nPlural"),t.qZA()(),t.TgZ(15,"div",10)(16,"div",5)(17,"mat-form-field",11),t._UZ(18,"mat-icon",12)(19,"input",13),t.qZA()(),t.TgZ(20,"button",14),t.NdJ("click",function(){return e.createContact()}),t._UZ(21,"mat-icon",15),t.TgZ(22,"span",16),t._uU(23,"Add"),t.qZA()()()(),t.TgZ(24,"div",17),t.YNc(25,et,2,2,"ng-container",9),t.YNc(26,nt,2,0,"ng-template",null,18,t.W1O),t.qZA()()()()()),2&n&&(t.xp6(2),t.Q6J("mode",e.drawerMode)("opened",!1)("position","end")("disableClose",!0),t.xp6(10),t.Q6J("ngIf",(null==e.adminList?null:e.adminList.length)>0),t.xp6(1),t.hij(" ",t.xi3(14,13,null==e.adminList?null:e.adminList.length,t.DdM(16,it))," "),t.xp6(5),t.Q6J("svgIcon","heroicons_solid:search"),t.xp6(1),t.Q6J("formControl",e.searchInputControl)("autocomplete","off")("placeholder","Search admins"),t.xp6(1),t.Q6J("color","primary"),t.xp6(1),t.Q6J("svgIcon","heroicons_outline:plus"),t.xp6(4),t.Q6J("ngIf",(null==e.adminList?null:e.adminList.length)>0))},dependencies:[m.lC,m.rH,h.lW,d.KE,d.qo,Z.Hw,T.Nt,y.jA,y.kh,y.LW,f.mk,f.sg,f.O5,s.Fj,s.JJ,s.oH,f.Gx],encapsulation:2,changeDetection:0});var A=r(5861),at=r(7759),ot=r(7401),rt=r(8184),lt=r(1481);const st=["avatarFileInput"];function ct(i,n){if(1&i&&(t.ynx(0),t._UZ(1,"img",18),t.BQk()),2&i){const e=t.oxw(2);t.xp6(1),t.Q6J("src",null==e.adminObject?null:e.adminObject.background,t.LSH)}}function mt(i,n){if(1&i&&t._UZ(0,"img",19),2&i){const e=t.oxw(2);t.Q6J("src",null==e.adminObject?null:e.adminObject.photo_url,t.LSH)}}function dt(i,n){if(1&i&&(t.TgZ(0,"div",20),t._uU(1),t.qZA()),2&i){const e=t.oxw(2);t.xp6(1),t.hij(" ",null==e.adminObject||null==e.adminObject.first_name?null:e.adminObject.first_name.charAt(0)," ")}}function ut(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"div",21),t._UZ(2,"mat-icon",22),t.TgZ(3,"div",23)(4,"div",24)(5,"a",25),t._uU(6),t.qZA()()()(),t.BQk()),2&i){const e=t.oxw(2);t.xp6(2),t.Q6J("svgIcon","heroicons_outline:mail"),t.xp6(3),t.Q6J("href","mailto:"+(null==e.adminObject?null:e.adminObject.email),t.LSH),t.xp6(1),t.hij(" ",null==e.adminObject?null:e.adminObject.email," ")}}const k=function(){return["../"]};function pt(i,n){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"div",2),t.YNc(2,ct,2,1,"ng-container",1),t.TgZ(3,"div",3)(4,"a",4),t._UZ(5,"mat-icon",5),t.qZA()()(),t.TgZ(6,"div",6)(7,"div",7)(8,"div",8)(9,"div",9),t.YNc(10,mt,1,1,"img",10),t.YNc(11,dt,2,1,"div",11),t.qZA(),t.TgZ(12,"div",12)(13,"button",13),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.toggleEditMode(!0))}),t._UZ(14,"mat-icon",14),t.TgZ(15,"span",15),t._uU(16,"Edit"),t.qZA()()()(),t.TgZ(17,"div",16),t._uU(18),t.qZA(),t.TgZ(19,"div",17),t.YNc(20,ut,7,3,"ng-container",1),t.qZA()()(),t.BQk()}if(2&i){const e=t.oxw();t.xp6(2),t.Q6J("ngIf",null==e.adminObject?null:e.adminObject.background),t.xp6(2),t.Q6J("matTooltip","Close")("routerLink",t.DdM(10,k)),t.xp6(1),t.Q6J("svgIcon","heroicons_outline:x"),t.xp6(5),t.Q6J("ngIf",null==e.adminObject?null:e.adminObject.photo_url),t.xp6(1),t.Q6J("ngIf",!(null!=e.adminObject&&e.adminObject.photo_url)),t.xp6(3),t.Q6J("svgIcon","heroicons_solid:pencil-alt"),t.xp6(4),t.AsE("",null==e.adminObject?null:e.adminObject.first_name," ",null==e.adminObject?null:e.adminObject.last_name,""),t.xp6(2),t.Q6J("ngIf",null==e.adminObject?null:e.adminObject.email)}}function ft(i,n){if(1&i&&(t.ynx(0),t._UZ(1,"img",18),t.BQk()),2&i){const e=t.oxw(2);t.xp6(1),t.Q6J("src",null==e.adminObject?null:e.adminObject.background,t.LSH)}}function gt(i,n){if(1&i&&t._UZ(0,"img",19),2&i){const e=t.oxw(2);t.Q6J("src",e.avatarObject?e.imageFileTOString(e.avatarObject):null==e.adminObject?null:e.adminObject.photo_url,t.LSH)}}function _t(i,n){if(1&i&&(t.TgZ(0,"div",20),t._uU(1),t.qZA()),2&i){const e=t.oxw(2);t.xp6(1),t.hij(" ",null==e.adminObject?null:e.adminObject.first_name.charAt(0)," ")}}function ht(i,n){1&i&&(t.TgZ(0,"mat-error"),t._uU(1," Email address is required "),t.qZA())}function xt(i,n){1&i&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a valid email address "),t.qZA())}function vt(i,n){if(1&i&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&i){const e=t.oxw(2);t.xp6(1),t.hij(" ",e.adminForm.get("email").errors.serverError," ")}}function bt(i,n){1&i&&t._UZ(0,"mat-icon",14),2&i&&t.Q6J("svgIcon","heroicons_solid:eye")}function yt(i,n){1&i&&t._UZ(0,"mat-icon",14),2&i&&t.Q6J("svgIcon","heroicons_solid:eye-off")}function At(i,n){if(1&i&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&i){const e=t.oxw(3);t.xp6(1),t.hij(" ",e.adminForm.get("password").errors.passwordValidator," ")}}function Ct(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"div",35)(1,"mat-form-field",44)(2,"mat-label"),t._uU(3,"Password"),t.qZA(),t._UZ(4,"input",45,46),t.TgZ(6,"button",47),t.NdJ("click",function(){t.CHM(e);const o=t.MAs(5);return t.KtG(o.type="password"===o.type?"text":"password")}),t.YNc(7,bt,1,1,"mat-icon",48),t.YNc(8,yt,1,1,"mat-icon",48),t.qZA(),t.YNc(9,At,2,1,"mat-error",1),t.qZA()()}if(2&i){const e=t.MAs(5),a=t.oxw(2);t.xp6(4),t.Q6J("formControlName","password"),t.xp6(3),t.Q6J("ngIf","password"===e.type),t.xp6(1),t.Q6J("ngIf","text"===e.type),t.xp6(1),t.Q6J("ngIf",a.adminForm.get("password").hasError("passwordValidator"))}}function Zt(i,n){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"div",2),t.YNc(2,ft,2,1,"ng-container",1),t.TgZ(3,"div",3)(4,"a",26),t._UZ(5,"mat-icon",5),t.qZA()()(),t.TgZ(6,"div",27)(7,"div",7)(8,"form",28)(9,"div",8)(10,"div",29),t._UZ(11,"div",30),t.TgZ(12,"div",31)(13,"div")(14,"input",32,33),t.NdJ("change",function(){t.CHM(e);const o=t.MAs(15),l=t.oxw();return t.KtG(l.uploadAvatar(o.files))}),t.qZA(),t.TgZ(16,"label",34),t._UZ(17,"mat-icon",5),t.qZA()()(),t.YNc(18,gt,1,1,"img",10),t.YNc(19,_t,2,1,"div",11),t.qZA()(),t.TgZ(20,"div",35)(21,"mat-form-field",36)(22,"mat-label"),t._uU(23,"First Name"),t.qZA(),t._UZ(24,"mat-icon",37)(25,"input",38),t.TgZ(26,"mat-error"),t._uU(27," First name is required "),t.qZA()()(),t.TgZ(28,"div",35)(29,"mat-form-field",36)(30,"mat-label"),t._uU(31,"Last Name"),t.qZA(),t._UZ(32,"mat-icon",37)(33,"input",38),t.TgZ(34,"mat-error"),t._uU(35," Last name is required "),t.qZA()()(),t.TgZ(36,"div",35)(37,"mat-form-field",36)(38,"mat-label"),t._uU(39,"Email"),t.qZA(),t._UZ(40,"mat-icon",37)(41,"input",39),t.YNc(42,ht,2,0,"mat-error",1),t.YNc(43,xt,2,0,"mat-error",1),t.YNc(44,vt,2,1,"mat-error",1),t.qZA()(),t.YNc(45,Ct,10,4,"div",40),t.TgZ(46,"div",41)(47,"button",42),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(null!=o.adminObject&&o.adminObject.admin_id?o.toggleEditMode(!1):o.goBack())}),t._uU(48," Cancel "),t.qZA(),t.TgZ(49,"button",43),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.updateContact())}),t._uU(50," Save "),t.qZA()()()()(),t.BQk()}if(2&i){const e=t.oxw();t.xp6(2),t.Q6J("ngIf",null==e.adminObject?null:e.adminObject.background),t.xp6(2),t.Q6J("matTooltip","Close")("routerLink",t.DdM(33,k)),t.xp6(1),t.Q6J("svgIcon","heroicons_outline:x"),t.xp6(3),t.Q6J("formGroup",e.adminForm),t.xp6(6),t.Q6J("multiple",!1)("accept","image/jpeg, image/png"),t.xp6(3),t.Q6J("svgIcon","heroicons_outline:camera"),t.xp6(1),t.Q6J("ngIf",e.avatarObject||(null==e.adminObject?null:e.adminObject.photo_url)),t.xp6(1),t.Q6J("ngIf",!(null!=e.adminObject&&e.adminObject.photo_url)),t.xp6(2),t.Q6J("subscriptSizing","dynamic"),t.xp6(3),t.Q6J("svgIcon","heroicons_solid:user-circle"),t.xp6(1),t.Q6J("formControlName","first_name")("placeholder","First Name")("spellcheck",!1),t.xp6(4),t.Q6J("subscriptSizing","dynamic"),t.xp6(3),t.Q6J("svgIcon","heroicons_solid:user-circle"),t.xp6(1),t.Q6J("formControlName","last_name")("placeholder","Last Name")("spellcheck",!1),t.xp6(4),t.Q6J("subscriptSizing","dynamic"),t.xp6(3),t.Q6J("svgIcon","heroicons_solid:mail"),t.xp6(1),t.Q6J("formControlName","email")("placeholder","Email address")("spellcheck",!1),t.xp6(1),t.Q6J("ngIf",e.adminForm.get("email").hasError("required")),t.xp6(1),t.Q6J("ngIf",e.adminForm.get("email").hasError("email")),t.xp6(1),t.Q6J("ngIf",e.adminForm.get("email").hasError("serverError")),t.xp6(1),t.Q6J("ngIf",!(null!=e.adminObject&&e.adminObject.admin_id)),t.xp6(2),t.Q6J("matTooltip","Cancel"),t.xp6(2),t.Q6J("color","primary")("disabled",e.adminForm.invalid)("matTooltip","Save")}}class v{constructor(n,e,a,o,l,c,u,b,wt,jt,It){this._activatedRoute=n,this._changeDetectorRef=e,this._adminsListComponent=a,this.apiService=o,this._formBuilder=l,this._fuseConfirmationService=c,this._renderer2=u,this._router=b,this._overlay=wt,this._viewContainerRef=jt,this.domSanitizer=It,this.editMode=!1,this.admin_id=null,this.avatarObject=null,this._unsubscribeAll=new I.x,this._activatedRoute.params.subscribe(Qt=>{this.admin_id=Qt.id,"createAdmin"===this.admin_id?this.toggleEditMode(!0):this.getAdminFromServer()})}ngOnInit(){this._adminsListComponent.matDrawer.open(),this.adminForm=this._formBuilder.group({first_name:["",s.kI.required],last_name:["",s.kI.required],email:["",[s.kI.required,s.kI.email]],password:["",(0,at.y)()]})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}getAdminFromServer(){var n=this;this.apiService.getAdminById(this.admin_id).subscribe(function(){var e=(0,A.Z)(function*(a){console.log(a),a.data&&(n.adminObject={...a.data},n._changeDetectorRef.markForCheck())});return function(a){return e.apply(this,arguments)}}(),e=>{console.log(e)})}closeDrawer(){return this._adminsListComponent.matDrawer.close()}toggleEditMode(n=null){null===n?this.editMode=!this.editMode:(this.editMode=n,this.adminObject&&(this.adminForm.patchValue({...this.adminObject}),this.adminForm.get("email")?.disable(),this.adminForm.removeControl("password"))),this._changeDetectorRef.markForCheck()}updateContact(){var n=this;return(0,A.Z)(function*(){const e=n.adminForm.getRawValue();if("createAdmin"===n.admin_id&&e)console.log(e),n.apiService.registrationAdmin({email:e.email,password:e.password}).subscribe(a=>{if(console.log(a),a.data){let o={admin_id:a.data.admin_id,first_name:n.capitalizeFirstLetter(e.first_name),last_name:n.capitalizeFirstLetter(e.last_name)};n.updateAdminQuery(o)}else"Email address already registered by another user"===a?.error?.message&&(n.adminForm.get("email").setErrors({serverError:a?.error?.message}),n._changeDetectorRef.markForCheck())},a=>{console.log(a)});else{let a={admin_id:n.admin_id,first_name:n.capitalizeFirstLetter(e.first_name),last_name:n.capitalizeFirstLetter(e.last_name)};n.updateAdminQuery(a)}})()}updateAdminQuery(n){var e=this;this.apiService.updateAdmin(n).subscribe(function(){var a=(0,A.Z)(function*(o){if(console.log(o),o.data&&e.avatarObject){const l=yield e.convertImageFileToWebpFile(e.avatarObject);let c=new FormData;c.append("photo",l,`${o.data.admin_id}.webp`),c.append("id",o.data.admin_id),e.apiService.adminUploadImage(c).subscribe(function(){var u=(0,A.Z)(function*(b){console.log(b),b.data&&(e.toggleEditMode(!1),e._router.navigate(["../",o.data.admin_id],{relativeTo:e._activatedRoute}),e._changeDetectorRef.markForCheck())});return function(b){return u.apply(this,arguments)}}(),u=>{console.log(u)})}});return function(o){return a.apply(this,arguments)}}(),a=>{console.log(a)})}deleteContact(){this._fuseConfirmationService.open({title:"Delete adminObject",message:"Are you sure you want to delete this adminObject? This action cannot be undone!",actions:{confirm:{label:"Delete"}}}).afterClosed().subscribe(e=>{})}goBack(){this._router.navigate(["../"],{relativeTo:this._activatedRoute})}uploadAvatar(n){if(!n.length)return;const a=n[0];!["image/jpeg","image/png"].includes(a.type)||(console.log("file -> ",a),this.avatarObject=a)}removeAvatar(){}imageFileTOString(n){return"string"==typeof n?n:this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(n))}capitalizeFirstLetter(n){return n[0].toUpperCase()+n.slice(1).toLowerCase()}convertImageFileToWebpFile(n){return new Promise((e,a)=>{const o=new Image;o.onload=()=>{const l=document.createElement("canvas");l.width=o.naturalWidth,l.height=o.naturalHeight,l.getContext("2d").drawImage(o,0,0),l.toBlob(c=>{let u=new File([c],"my-new-group-image.webp",{type:c.type});e(u)},"image/webp")},o.crossOrigin="anonymous",o.src=URL.createObjectURL(n)})}}v.\u0275fac=function(n){return new(n||v)(t.Y36(m.gz),t.Y36(t.sBO),t.Y36(g),t.Y36(L.s),t.Y36(s.QS),t.Y36(ot.R),t.Y36(t.Qsj),t.Y36(m.F0),t.Y36(rt.aV),t.Y36(t.s_b),t.Y36(lt.H7))},v.\u0275cmp=t.Xpm({type:v,selectors:[["admins-details"]],viewQuery:function(n,e){if(1&n&&t.Gf(st,5),2&n){let a;t.iGM(a=t.CRH())&&(e._avatarFileInput=a.first)}},decls:3,vars:2,consts:[[1,"flex","flex-col","w-full"],[4,"ngIf"],[1,"relative","w-full","h-24","sm:h-48","px-8","sm:px-12","bg-accent-100","dark:bg-accent-700"],[1,"flex","items-center","justify-end","w-full","max-w-3xl","mx-auto","pt-6"],["mat-icon-button","",3,"matTooltip","routerLink"],[1,"text-white",3,"svgIcon"],[1,"relative","flex","flex-col","flex-auto","items-center","p-6","pt-0","sm:p-12","sm:pt-0"],[1,"w-full","max-w-3xl"],[1,"flex","flex-auto","items-end","-mt-16"],[1,"flex","items-center","justify-center","w-32","h-32","rounded-full","overflow-hidden","ring-4","ring-bg-card"],["class","object-cover w-full h-full",3,"src",4,"ngIf"],["class","flex items-center justify-center w-full h-full rounded overflow-hidden uppercase text-8xl font-bold leading-none bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200",4,"ngIf"],[1,"flex","items-center","ml-auto","mb-1"],["mat-stroked-button","",3,"click"],[1,"icon-size-5",3,"svgIcon"],[1,"ml-2"],[1,"mt-3","text-4xl","font-bold","truncate"],[1,"flex","flex-col","mt-4","pt-6","border-t","space-y-8"],[1,"absolute","inset-0","object-cover","w-full","h-full",3,"src"],[1,"object-cover","w-full","h-full",3,"src"],[1,"flex","items-center","justify-center","w-full","h-full","rounded","overflow-hidden","uppercase","text-8xl","font-bold","leading-none","bg-gray-200","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"flex"],[3,"svgIcon"],[1,"min-w-0","ml-6","space-y-1"],[1,"flex","items-center","leading-6"],["target","_blank",1,"hover:underline","text-primary-500",3,"href"],["mat-icon-button","",1,"bg-gray-700","z-[1]",3,"matTooltip","routerLink"],[1,"relative","flex","flex-col","flex-auto","items-center","px-6","sm:px-12"],[3,"formGroup"],[1,"relative","flex","items-center","justify-center","w-32","h-32","rounded-full","overflow-hidden","ring-4","ring-bg-card"],[1,"absolute","inset-0","bg-black","bg-opacity-50","z-10"],[1,"absolute","inset-0","flex","items-center","justify-center","z-20"],["id","avatar-file-input","type","file",1,"absolute","h-0","w-0","opacity-0","invisible","pointer-events-none",3,"multiple","accept","change"],["avatarFileInput",""],["for","avatar-file-input","matRipple","",1,"flex","items-center","justify-center","w-10","h-10","rounded-full","cursor-pointer","hover:bg-hover"],[1,"mt-8"],[1,"w-full",3,"subscriptSizing"],["matPrefix","",1,"hidden","sm:flex","icon-size-5",3,"svgIcon"],["matInput","",3,"formControlName","placeholder","spellcheck"],["matInput","","type","email",3,"formControlName","placeholder","spellcheck"],["class","mt-8",4,"ngIf"],[1,"flex","items-center","mt-10","-mx-6","sm:-mx-12","py-4","pr-4","pl-1","sm:pr-12","sm:pl-7","border-t","bg-gray-50","dark:bg-transparent"],["mat-button","",1,"ml-auto",3,"matTooltip","click"],["mat-flat-button","",1,"ml-2",3,"color","disabled","matTooltip","click"],[1,"w-full"],["id","password","matInput","","type","password",3,"formControlName"],["passwordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0),t.YNc(1,pt,21,11,"ng-container",1),t.YNc(2,Zt,51,34,"ng-container",1),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngIf",!e.editMode),t.xp6(1),t.Q6J("ngIf",e.editMode))},dependencies:[m.rH,h.lW,h.o6,h.RK,d.KE,d.hX,d.TO,d.qo,d.R9,Z.Hw,T.Nt,C.wG,j.gM,f.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u],encapsulation:2,changeDetection:0});const Tt=[{path:"",component:x,children:[{path:"",component:g,children:[{path:":id",component:v,canDeactivate:[p]}]}]}];class _{}_.\u0275fac=function(n){return new(n||_)},_.\u0275mod=t.oAB({type:_}),_.\u0275inj=t.cJS({providers:[{provide:C.sG,useValue:{parse:{dateInput:"D"},display:{dateInput:"DDD",monthYearLabel:"LLL yyyy",dateA11yLabel:"DD",monthYearA11yLabel:"LLLL yyyy"}}}],imports:[m.Bz.forChild(Tt),h.ot,J.p9,F.FA,O.t,d.lN,Z.Ps,T.c,D.En,U.Tx,N.Cv,Y.Fk,C.si,S.LD,y.SJ,M.p0,j.AV,R.V,E.m]})}}]);