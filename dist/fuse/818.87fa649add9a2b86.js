"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[818],{6818:(u,a,e)=>{e.r(a),e.d(a,{TermsConditionsModule:()=>s});var d=e(9299),l=e(5861),t=e(4650),c=e(5830),m=e(7009);class i{constructor(o,n){this.apiService=o,this._snackBar=n,this.isLoading=!0,this.getTermsAndConditionsDataFromServer()}getTermsAndConditionsDataFromServer(){var o=this;return(0,l.Z)(function*(){try{o.isLoading=!0;const n=yield o.apiService.getTermsAndConditionsData();console.log("getTermsAndConditionsDataResponse => ",n),n?.data?o.textData=n?.data?.terms_and_conditions:o._snackBar.open(n?.error?.message?n?.error?.message:"Something went wrong! Try again","",{horizontalPosition:"center",verticalPosition:"top",duration:3e3,panelClass:["error-toast"]}),o.isLoading=!1}catch(n){console.error(n),o._snackBar.open(n?.error?.message?n?.error?.message:"Something went wrong! Try again","",{horizontalPosition:"center",verticalPosition:"top",duration:3e3,panelClass:["error-toast"]}),o.isLoading=!1}})()}}i.\u0275fac=function(o){return new(o||i)(t.Y36(c.s),t.Y36(m.ux))},i.\u0275cmp=t.Xpm({type:i,selectors:[["terms-conditions"]],decls:7,vars:1,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex-auto","p-6","sm:p-10"],[1,"mb-4"],[1,"text-3xl","md:text-4xl","font-extrabold","tracking-tight","leading-7","sm:leading-10","truncate","text-center"],[1,""],[3,"innerHTML"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),t._uU(4," Terms & Conditions "),t.qZA()(),t.TgZ(5,"div",4),t._UZ(6,"div",5),t.qZA()()()),2&o&&(t.xp6(6),t.Q6J("innerHTML",n.textData,t.oJD))},encapsulation:2});const p=[{path:"",component:i}];class s{}s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[d.Bz.forChild(p)]})}}]);