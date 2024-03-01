"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[883],{2883:(N,m,e)=>{e.r(m),e.d(m,{AuthForgotPasswordModule:()=>n});var g=e(9299),f=e(4859),l=e(9549),p=e(7392),u=e(284),c=e(1572),h=e(6236),w=e(7775),v=e(4466),a=e(4006),x=e(8746),y=e(8288),t=e(4650),Z=e(8951),A=e(8214),F=e(6895);const P=["forgotPasswordNgForm"];function T(r,o){if(1&r&&(t.TgZ(0,"fuse-alert",36),t._uU(1),t.qZA()),2&r){const s=t.oxw();t.Q6J("appearance","outline")("showIcon",!1)("type",s.alert.type)("@shake","error"===s.alert.type),t.xp6(1),t.hij(" ",s.alert.message," ")}}function U(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1," Email address is required "),t.qZA())}function C(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a valid email address "),t.qZA())}function b(r,o){1&r&&(t.TgZ(0,"span"),t._uU(1," Send reset link "),t.qZA())}function J(r,o){1&r&&t._UZ(0,"mat-progress-spinner",37),2&r&&t.Q6J("diameter",24)("mode","indeterminate")}const j=function(){return["/sign-in"]};class i{constructor(o,s){this._authService=o,this._formBuilder=s,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.forgotPasswordForm=this._formBuilder.group({email:["",[a.kI.required,a.kI.email]]})}sendResetLink(){this.forgotPasswordForm.invalid||(this.forgotPasswordForm.disable(),this.showAlert=!1,this._authService.forgotPassword(this.forgotPasswordForm.get("email").value).pipe((0,x.x)(()=>{this.forgotPasswordForm.enable(),this.forgotPasswordNgForm.resetForm(),this.showAlert=!0})).subscribe(o=>{this.alert={type:"success",message:"Password reset sent! You'll receive an email if you are registered on our system."}},o=>{this.alert={type:"error",message:"Email does not found! Are you sure you are already a member?"}}))}}i.\u0275fac=function(o){return new(o||i)(t.Y36(Z.e),t.Y36(a.QS))},i.\u0275cmp=t.Xpm({type:i,selectors:[["auth-forgot-password"]],viewQuery:function(o,s){if(1&o&&t.Gf(P,5),2&o){let d;t.iGM(d=t.CRH())&&(s.forgotPasswordNgForm=d.first)}},decls:52,vars:11,consts:[[1,"flex","flex-col","sm:flex-row","items-center","md:items-start","sm:justify-center","md:justify-start","flex-auto","min-w-0"],[1,"md:flex","md:items-center","md:justify-end","w-full","sm:w-auto","md:h-full","md:w-1/2","py-8","px-4","sm:p-12","md:p-16","sm:rounded-2xl","md:rounded-none","sm:shadow","md:shadow-none","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12"],["src","assets/images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight"],[1,"mt-0.5","font-medium"],["class","mt-8",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],["forgotPasswordNgForm","ngForm"],[1,"w-full"],["id","email","matInput","",3,"formControlName"],[4,"ngIf"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-3",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8","text-md","font-medium","text-secondary"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],[1,"relative","hidden","md:flex","flex-auto","items-center","justify-center","w-1/2","h-full","p-16","lg:px-28","overflow-hidden","bg-gray-800","dark:border-l"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-top-16","-right-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"z-10","relative","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","tracking-tight","leading-6","text-gray-400"],[1,"flex","items-center","mt-8"],[1,"flex","flex-0","items-center","-space-x-1.5"],["src","assets/images/avatars/female-18.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/female-11.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/male-09.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/male-16.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],[1,"ml-4","font-medium","tracking-tight","text-gray-400"],[1,"mt-8",3,"appearance","showIcon","type"],[3,"diameter","mode"]],template:function(o,s){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"img",4),t.qZA(),t.TgZ(5,"div",5),t._uU(6,"Forgot password?"),t.qZA(),t.TgZ(7,"div",6),t._uU(8,"Fill the form to reset your password"),t.qZA(),t.YNc(9,T,2,5,"fuse-alert",7),t.TgZ(10,"form",8,9)(12,"mat-form-field",10)(13,"mat-label"),t._uU(14,"Email address"),t.qZA(),t._UZ(15,"input",11),t.YNc(16,U,2,0,"mat-error",12),t.YNc(17,C,2,0,"mat-error",12),t.qZA(),t.TgZ(18,"button",13),t.NdJ("click",function(){return s.sendResetLink()}),t.YNc(19,b,2,0,"span",12),t.YNc(20,J,1,2,"mat-progress-spinner",14),t.qZA(),t.TgZ(21,"div",15)(22,"span"),t._uU(23,"Return to"),t.qZA(),t.TgZ(24,"a",16),t._uU(25,"sign in "),t.qZA()()()()(),t.TgZ(26,"div",17),t.O4$(),t.TgZ(27,"svg",18)(28,"g",19),t._UZ(29,"circle",20)(30,"circle",21),t.qZA()(),t.TgZ(31,"svg",22)(32,"defs")(33,"pattern",23),t._UZ(34,"rect",24),t.qZA()(),t._UZ(35,"rect",25),t.qZA(),t.kcU(),t.TgZ(36,"div",26)(37,"div",27)(38,"div"),t._uU(39,"Welcome to"),t.qZA(),t.TgZ(40,"div"),t._uU(41,"our community"),t.qZA()(),t.TgZ(42,"div",28),t._uU(43," Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. "),t.qZA(),t.TgZ(44,"div",29)(45,"div",30),t._UZ(46,"img",31)(47,"img",32)(48,"img",33)(49,"img",34),t.qZA(),t.TgZ(50,"div",35),t._uU(51,"More than 17k people joined us, it's your turn"),t.qZA()()()()()),2&o&&(t.xp6(9),t.Q6J("ngIf",s.showAlert),t.xp6(1),t.Q6J("formGroup",s.forgotPasswordForm),t.xp6(5),t.Q6J("formControlName","email"),t.xp6(1),t.Q6J("ngIf",s.forgotPasswordForm.get("email").hasError("required")),t.xp6(1),t.Q6J("ngIf",s.forgotPasswordForm.get("email").hasError("email")),t.xp6(1),t.Q6J("color","primary")("disabled",s.forgotPasswordForm.disabled),t.xp6(1),t.Q6J("ngIf",!s.forgotPasswordForm.disabled),t.xp6(1),t.Q6J("ngIf",s.forgotPasswordForm.disabled),t.xp6(4),t.Q6J("routerLink",t.DdM(10,j)))},dependencies:[g.rH,f.lW,l.KE,l.hX,l.TO,u.Nt,c.Ou,A.W,F.O5,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u],encapsulation:2,data:{animation:y.L}});const I=[{path:"",component:i}];class n{}n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.Bz.forChild(I),f.ot,l.lN,p.Ps,u.c,c.Cq,h.J,w.fC,v.m]})}}]);