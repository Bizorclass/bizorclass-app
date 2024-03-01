"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[241],{4241:(j,p,s)=>{s.r(p),s.d(p,{AccessAccountModule:()=>a});var u=s(9299),d=s(4859),x=s(6709),c=s(9549),f=s(7392),h=s(284),v=s(1572),A=s(6236),Z=s(7775),y=s(4466),i=s(4006),w=s(8288),t=s(4650),I=s(877),T=s(5830),U=s(8214),C=s(6895);const F=["signInNgForm"];function J(o,e){if(1&o&&(t.TgZ(0,"fuse-alert",32),t._uU(1),t.qZA()),2&o){const n=t.oxw();t.Q6J("appearance","outline")("showIcon",!1)("type",n.alert.type)("@shake","error"===n.alert.type),t.xp6(1),t.hij(" ",n.alert.message," ")}}function Q(o,e){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," Email address is required "),t.qZA())}function b(o,e){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a valid email address "),t.qZA())}function N(o,e){1&o&&t._UZ(0,"mat-icon",33),2&o&&t.Q6J("svgIcon","heroicons_solid:eye")}function q(o,e){1&o&&t._UZ(0,"mat-icon",33),2&o&&t.Q6J("svgIcon","heroicons_solid:eye-off")}function Y(o,e){1&o&&(t.TgZ(0,"span"),t._uU(1," Sign in "),t.qZA())}function M(o,e){1&o&&t._UZ(0,"mat-progress-spinner",34),2&o&&t.Q6J("diameter",24)("mode","indeterminate")}const S=function(){return["/forgot-password"]};class m{constructor(e,n,r,g,l){this._activatedRoute=e,this._authService=n,this.apiService=r,this._formBuilder=g,this._router=l,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.signInForm=this._formBuilder.group({email:["",[i.kI.required,i.kI.email]],password:["",i.kI.required]})}signIn(){this.signInForm.invalid||(this.signInForm.disable(),this.showAlert=!1,this.apiService.teacherLogin(this.signInForm.value).subscribe(e=>{if(console.log(e),e?.data){this._authService.user=e?.data;const n=this._activatedRoute.snapshot.queryParamMap.get("redirectURL")||"/dashboard";this._router.navigateByUrl(n)}else this.signInForm.enable(),this.alert={type:"error",message:"Wrong email or password"},this.showAlert=!0},e=>{console.log(e),this.signInForm.enable(),this.signInNgForm.resetForm(),this.alert={type:"error",message:"Wrong email or password"},this.showAlert=!0}))}}m.\u0275fac=function(e){return new(e||m)(t.Y36(u.gz),t.Y36(I.e),t.Y36(T.s),t.Y36(i.QS),t.Y36(u.F0))},m.\u0275cmp=t.Xpm({type:m,selectors:[["auth-access-account"]],viewQuery:function(e,n){if(1&e&&t.Gf(F,5),2&e){let r;t.iGM(r=t.CRH())&&(n.signInNgForm=r.first)}},decls:50,vars:14,consts:[[1,"flex","flex-col","sm:flex-row","items-center","md:items-start","sm:justify-center","md:justify-start","flex-auto","min-w-0"],[1,"md:flex","md:items-center","md:justify-end","w-full","sm:w-auto","md:h-full","md:w-1/2","py-8","px-4","sm:p-12","md:p-16","sm:rounded-2xl","md:rounded-none","sm:shadow","md:shadow-none","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12"],["src","assets/images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight"],["class","mt-8",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],["signInNgForm","ngForm"],[1,"w-full"],["id","email","matInput","",3,"formControlName"],[4,"ngIf"],["id","password","matInput","","type","password",3,"formControlName"],["passwordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],[1,"inline-flex","items-center","justify-between","w-full","mt-1.5"],[1,"text-md","font-medium","text-primary-500","hover:underline",3,"routerLink"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-6",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"relative","hidden","md:flex","flex-auto","items-center","justify-center","w-1/2","h-full","p-16","lg:px-28","overflow-hidden","bg-gray-800","dark:border-l"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-top-16","-right-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"z-10","relative","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","tracking-tight","leading-6","text-gray-400"],[1,"mt-8",3,"appearance","showIcon","type"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(e,n){if(1&e){const r=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"img",4),t.qZA(),t.TgZ(5,"div",5),t._uU(6,"Sign in"),t.qZA(),t.YNc(7,J,2,5,"fuse-alert",6),t.TgZ(8,"form",7,8)(10,"mat-form-field",9)(11,"mat-label"),t._uU(12,"Email address"),t.qZA(),t._UZ(13,"input",10),t.YNc(14,Q,2,0,"mat-error",11),t.YNc(15,b,2,0,"mat-error",11),t.qZA(),t.TgZ(16,"mat-form-field",9)(17,"mat-label"),t._uU(18,"Password"),t.qZA(),t._UZ(19,"input",12,13),t.TgZ(21,"button",14),t.NdJ("click",function(){t.CHM(r);const l=t.MAs(20);return t.KtG(l.type="password"===l.type?"text":"password")}),t.YNc(22,N,1,1,"mat-icon",15),t.YNc(23,q,1,1,"mat-icon",15),t.qZA(),t.TgZ(24,"mat-error"),t._uU(25," Password is required "),t.qZA()(),t.TgZ(26,"div",16)(27,"a",17),t._uU(28,"Forgot password? "),t.qZA()(),t.TgZ(29,"button",18),t.NdJ("click",function(){return n.signIn()}),t.YNc(30,Y,2,0,"span",11),t.YNc(31,M,1,2,"mat-progress-spinner",19),t.qZA()()()(),t.TgZ(32,"div",20),t.O4$(),t.TgZ(33,"svg",21)(34,"g",22),t._UZ(35,"circle",23)(36,"circle",24),t.qZA()(),t.TgZ(37,"svg",25)(38,"defs")(39,"pattern",26),t._UZ(40,"rect",27),t.qZA()(),t._UZ(41,"rect",28),t.qZA(),t.kcU(),t.TgZ(42,"div",29)(43,"div",30)(44,"div"),t._uU(45,"Welcome to"),t.qZA(),t.TgZ(46,"div"),t._uU(47,"our community"),t.qZA()(),t.TgZ(48,"div",31),t._uU(49," Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas quis voluptatum facere. Soluta facere voluptatem suscipit quibusdam excepturi eos quo sit, officia cumque non itaque alias ipsum blanditiis quos maiores? "),t.qZA()()()()}if(2&e){const r=t.MAs(20);t.xp6(7),t.Q6J("ngIf",n.showAlert),t.xp6(1),t.Q6J("formGroup",n.signInForm),t.xp6(5),t.Q6J("formControlName","email"),t.xp6(1),t.Q6J("ngIf",n.signInForm.get("email").hasError("required")),t.xp6(1),t.Q6J("ngIf",n.signInForm.get("email").hasError("email")),t.xp6(4),t.Q6J("formControlName","password"),t.xp6(3),t.Q6J("ngIf","password"===r.type),t.xp6(1),t.Q6J("ngIf","text"===r.type),t.xp6(4),t.Q6J("routerLink",t.DdM(13,S)),t.xp6(2),t.Q6J("color","primary")("disabled",n.signInForm.disabled),t.xp6(1),t.Q6J("ngIf",!n.signInForm.disabled),t.xp6(1),t.Q6J("ngIf",n.signInForm.disabled)}},dependencies:[u.rH,d.lW,d.RK,c.KE,c.hX,c.TO,c.R9,f.Hw,h.Nt,v.Ou,U.W,C.O5,i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u],encapsulation:2,data:{animation:w.L}});const R=[{path:"",component:m}];class a{}a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[u.Bz.forChild(R),d.ot,x.p9,c.lN,f.Ps,h.c,v.Cq,A.J,Z.fC,y.m]})}}]);