"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[313],{1313:(gr,T,a)=>{a.r(T),a.d(T,{AuthModule:()=>cr});var c=a(89),y=a(2355),q=a(7513),U=a(3058),N=a(7250),R=a(7455),m=a(2369),f=a(2074),d=a(1300),i=a(6652),l=a(6789),r=a(4355),J=a(7969),h=a(8987);const x=()=>{const o=(0,r.f3M)(h.K),e=(0,r.f3M)(l.F0);return o.isAuthorized$.pipe((0,J.U)(t=>!t||e.parseUrl("/auth/login")))};var F=a(7881),Z=a(447),_=a(3568),v=a(3787);function C(o){return e=>e.pipe((0,_.K)(t=>(t instanceof Z.k&&function j(o,e){Object.keys(o.controls).forEach(n=>{const s=e[n],A=o.controls[n];s&&A&&A.setErrors({invalid:s})})}(o,t.validationData),(0,v._)(()=>t))))}var p,o,g=a(4121),E=a(9676),I=a(5490),L=a(2519);(o=p||(p={})).matchControl=function e(n){return s=>s.parent?.get(n)?.value!==s.value?{matchError:!0}:null},o.convertTypeToMessage=function t(n,s){return{required:`${s??"Field"} is required`,email:"Email is incorrect",minlength:`${s} should contain minimum 8 symbols`,matchError:`${s} do not match`}[n]};let M=(()=>{class o{transform(t,n){return p.convertTypeToMessage(n,t)}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275pipe=r.Yjl({name:"errorMessage",type:o,pure:!0}),o})();function P(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=e.ngIf;r.xp6(1),r.hij(" ",t," ")}}function w(o,e){if(1&o&&(r.TgZ(0,"div",12),r.YNc(1,P,2,1,"mat-error",6),r.ALo(2,"async"),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.Q6J("ngIf",r.lcZ(2,1,t.commonErrors$))}}function O(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Email","required")," "))}function Y(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Email","email")," "))}function Q(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=e.$implicit;r.xp6(1),r.hij(" ",t," ")}}function $(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Password","required")," "))}function b(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Password","minlength")," "))}function S(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=e.$implicit;r.xp6(1),r.hij(" ",t," ")}}function B(o,e){1&o&&(r.TgZ(0,"div",13),r._UZ(1,"camp-spinner"),r.qZA())}let k=(()=>{class o{constructor(){this.isLoading$=new g.X(!1),this.commonErrors$=new g.X(""),this.formBuilder=(0,r.f3M)(i.j3),this.userService=(0,r.f3M)(h.K),this.destroyRef=(0,r.f3M)(r.ktI),this.router=(0,r.f3M)(l.F0),this.loginForm=this.initLoginForm()}login(){this.loginForm.markAllAsTouched(),!0!==this.loginForm.invalid&&(this.isLoading$.next(!0),this.userService.login(this.loginForm.value).pipe((0,E.P)(),C(this.loginForm),(0,_.K)(t=>(t instanceof Z.k&&null!=t.validationData.nonFieldErrors&&this.commonErrors$.next(t.validationData.nonFieldErrors),(0,v._)(()=>t))),(0,I.x)(()=>{this.isLoading$.next(!1)}),(0,F.sL)(this.destroyRef)).subscribe(()=>{this.router.navigate(["/"])}))}initLoginForm(){return this.formBuilder.group({email:this.formBuilder.control("",[i.kI.required,i.kI.email]),password:this.formBuilder.control("",[i.kI.required,i.kI.minLength(8)])})}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["camp-login"]],decls:26,vars:13,consts:[[1,"auth-container"],[1,"auth-title"],["class","auth-common-errors-container",4,"ngIf"],[1,"auth-form",3,"formGroup","ngSubmit"],["color","accent"],["formControlName","email","matInput",""],[4,"ngIf"],[4,"ngFor","ngForOf"],["type","password","formControlName","password","matInput",""],["type","submit","mat-raised-button","","color","primary",1,"auth-submit"],["routerLink","/auth/register","href","",1,"auth-link"],["class","auth-spinner",4,"ngIf"],[1,"auth-common-errors-container"],[1,"auth-spinner"]],template:function(t,n){1&t&&(r.TgZ(0,"div",0)(1,"h1",1),r._uU(2,"Login"),r.qZA(),r.YNc(3,w,3,3,"div",2),r.ALo(4,"async"),r.TgZ(5,"form",3),r.NdJ("ngSubmit",function(){return n.login()}),r.TgZ(6,"mat-form-field",4)(7,"mat-label",4),r._uU(8,"Email"),r.qZA(),r._UZ(9,"input",5),r.YNc(10,O,3,4,"mat-error",6),r.YNc(11,Y,3,4,"mat-error",6),r.YNc(12,Q,2,1,"mat-error",7),r.qZA(),r.TgZ(13,"mat-form-field",4)(14,"mat-label",4),r._uU(15,"Password"),r.qZA(),r._UZ(16,"input",8),r.YNc(17,$,3,4,"mat-error",6),r.YNc(18,b,3,4,"mat-error",6),r.YNc(19,S,2,1,"mat-error",7),r.qZA(),r.TgZ(20,"button",9),r._uU(21,"Login"),r.qZA()(),r.TgZ(22,"a",10),r._uU(23,"Do not have an account yet?"),r.qZA(),r.YNc(24,B,2,0,"div",11),r.ALo(25,"async"),r.qZA()),2&t&&(r.xp6(3),r.Q6J("ngIf",r.lcZ(4,9,n.commonErrors$)),r.xp6(2),r.Q6J("formGroup",n.loginForm),r.xp6(5),r.Q6J("ngIf",n.loginForm.controls.email.hasError("required")&&n.loginForm.controls.email.touched),r.xp6(1),r.Q6J("ngIf",n.loginForm.controls.email.hasError("email")&&n.loginForm.controls.email.touched),r.xp6(1),r.Q6J("ngForOf",n.loginForm.controls.email.getError("invalid")),r.xp6(5),r.Q6J("ngIf",n.loginForm.controls.password.hasError("required")&&n.loginForm.controls.password.touched),r.xp6(1),r.Q6J("ngIf",n.loginForm.controls.password.hasError("minlength")&&n.loginForm.controls.password.touched),r.xp6(1),r.Q6J("ngForOf",n.loginForm.controls.password.getError("invalid")),r.xp6(5),r.Q6J("ngIf",r.lcZ(25,11,n.isLoading$)))},dependencies:[i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u,l.rH,c.sg,c.O5,L.O,m.KE,m.hX,m.TO,f.Nt,d.lW,c.Ov,M],styles:[".auth-container[_ngcontent-%COMP%]{display:flex;height:100vh;flex-direction:column;justify-content:center;align-items:center}.auth-form[_ngcontent-%COMP%]{width:450px;display:flex;flex-direction:column}.auth-title[_ngcontent-%COMP%]{text-align:center;font-size:40px;margin-bottom:var(--space-lg)}.auth-spinner[_ngcontent-%COMP%]{position:fixed;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;z-index:100;background-color:var(--spinner-background-color)}.auth-submit[_ngcontent-%COMP%]{margin-bottom:var(--space-sm)}.auth-link[_ngcontent-%COMP%]{text-decoration:none;color:var(--primary-contrast-color)}.auth-common-errors-container[_ngcontent-%COMP%]{margin-bottom:var(--space-md)}"]}),o})();function z(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=e.ngIf;r.xp6(1),r.hij(" ",t," ")}}function K(o,e){if(1&o&&(r.TgZ(0,"div",14),r.YNc(1,z,2,1,"mat-error",6),r.ALo(2,"async"),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.Q6J("ngIf",r.lcZ(2,1,t.commonErrors$))}}function X(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Email","required")," "))}function G(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Email","email")," "))}function D(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=e.ngIf;r.xp6(1),r.hij(" ",t," ")}}function W(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"First name","required")," "))}function H(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=e.ngIf;r.xp6(1),r.hij(" ",t," ")}}function V(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Last name","required")," "))}function rr(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=e.ngIf;r.xp6(1),r.hij(" ",t," ")}}function or(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Password","minlength")," "))}function tr(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Password","required")," "))}function er(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=e.ngIf;r.xp6(1),r.hij(" ",t," ")}}function nr(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Repeated password","minlength")," "))}function ir(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Repeated password","required")," "))}function ar(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&o&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Passwords","matchError")," "))}function sr(o,e){1&o&&(r.TgZ(0,"div",15),r._UZ(1,"camp-spinner"),r.qZA())}const mr=[{path:"login",component:k,canActivate:[x]},{path:"register",component:(()=>{class o{constructor(){this.isLoading$=new g.X(!1),this.commonErrors$=new g.X(""),this.formBuilder=(0,r.f3M)(i.j3),this.userService=(0,r.f3M)(h.K),this.destroyRef=(0,r.f3M)(r.ktI),this.router=(0,r.f3M)(l.F0),this.registerForm=this.initRegisterForm()}register(){this.registerForm.markAllAsTouched(),!0!==this.registerForm.invalid&&(this.isLoading$.next(!0),this.userService.register(this.registerForm.value).pipe((0,E.P)(),C(this.registerForm),(0,I.x)(()=>{this.isLoading$.next(!1)}),(0,_.K)(t=>(t instanceof Z.k&&null!=t.validationData.nonFieldErrors&&this.commonErrors$.next(t.validationData.nonFieldErrors),(0,v._)(()=>t))),(0,F.sL)(this.destroyRef)).subscribe(()=>{this.router.navigate(["/"])}))}initRegisterForm(){return this.formBuilder.group({email:this.formBuilder.control("",[i.kI.required,i.kI.email]),firstName:this.formBuilder.control("",[i.kI.required]),lastName:this.formBuilder.control("",[i.kI.required]),password:this.formBuilder.control("",[i.kI.required,i.kI.minLength(8)]),repeatPassword:this.formBuilder.control("",[i.kI.required,i.kI.minLength(8),p.matchControl("password")])})}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["camp-login"]],decls:45,vars:20,consts:[[1,"auth-container"],[1,"auth-title"],["class","auth-common-errors-container",4,"ngIf"],[1,"auth-form",3,"formGroup","ngSubmit"],["color","accent"],["formControlName","email","matInput",""],[4,"ngIf"],["formControlName","firstName","matInput",""],["formControlName","lastName","matInput",""],["type","password","formControlName","password","matInput",""],["type","password","formControlName","repeatPassword","matInput",""],["type","submit","mat-raised-button","","color","primary",1,"auth-submit"],["routerLink","/auth/login","href","",1,"auth-link"],["class","auth-spinner",4,"ngIf"],[1,"auth-common-errors-container"],[1,"auth-spinner"]],template:function(t,n){1&t&&(r.TgZ(0,"div",0)(1,"h1",1),r._uU(2,"Register"),r.qZA(),r.YNc(3,K,3,3,"div",2),r.ALo(4,"async"),r.TgZ(5,"form",3),r.NdJ("ngSubmit",function(){return n.register()}),r.TgZ(6,"mat-form-field",4)(7,"mat-label",4),r._uU(8,"Email"),r.qZA(),r._UZ(9,"input",5),r.YNc(10,X,3,4,"mat-error",6),r.YNc(11,G,3,4,"mat-error",6),r.YNc(12,D,2,1,"mat-error",6),r.qZA(),r.TgZ(13,"mat-form-field",4)(14,"mat-label",4),r._uU(15,"First name"),r.qZA(),r._UZ(16,"input",7),r.YNc(17,W,3,4,"mat-error",6),r.YNc(18,H,2,1,"mat-error",6),r.qZA(),r.TgZ(19,"mat-form-field",4)(20,"mat-label",4),r._uU(21,"Last name"),r.qZA(),r._UZ(22,"input",8),r.YNc(23,V,3,4,"mat-error",6),r.YNc(24,rr,2,1,"mat-error",6),r.qZA(),r.TgZ(25,"mat-form-field",4)(26,"mat-label",4),r._uU(27,"Password"),r.qZA(),r._UZ(28,"input",9),r.YNc(29,or,3,4,"mat-error",6),r.YNc(30,tr,3,4,"mat-error",6),r.YNc(31,er,2,1,"mat-error",6),r.qZA(),r.TgZ(32,"mat-form-field",4)(33,"mat-label",4),r._uU(34,"Repeat password"),r.qZA(),r._UZ(35,"input",10),r.YNc(36,nr,3,4,"mat-error",6),r.YNc(37,ir,3,4,"mat-error",6),r.YNc(38,ar,3,4,"mat-error",6),r.qZA(),r.TgZ(39,"button",11),r._uU(40,"Register"),r.qZA()(),r.TgZ(41,"a",12),r._uU(42,"Already have an account?"),r.qZA(),r.YNc(43,sr,2,0,"div",13),r.ALo(44,"async"),r.qZA()),2&t&&(r.xp6(3),r.Q6J("ngIf",r.lcZ(4,16,n.commonErrors$)),r.xp6(2),r.Q6J("formGroup",n.registerForm),r.xp6(5),r.Q6J("ngIf",n.registerForm.controls.email.hasError("required")&&n.registerForm.controls.email.touched),r.xp6(1),r.Q6J("ngIf",n.registerForm.controls.email.hasError("email")&&n.registerForm.controls.email.touched),r.xp6(1),r.Q6J("ngIf",n.registerForm.controls.email.getError("invalid")),r.xp6(5),r.Q6J("ngIf",n.registerForm.controls.firstName.hasError("required")&&n.registerForm.controls.firstName.touched),r.xp6(1),r.Q6J("ngIf",n.registerForm.controls.firstName.getError("invalid")),r.xp6(5),r.Q6J("ngIf",n.registerForm.controls.lastName.hasError("required")&&n.registerForm.controls.lastName.touched),r.xp6(1),r.Q6J("ngIf",n.registerForm.controls.lastName.getError("invalid")),r.xp6(5),r.Q6J("ngIf",n.registerForm.controls.password.hasError("minlength")&&n.registerForm.controls.password.touched),r.xp6(1),r.Q6J("ngIf",n.registerForm.controls.password.hasError("required")&&n.registerForm.controls.password.touched),r.xp6(1),r.Q6J("ngIf",n.registerForm.controls.password.getError("invalid")),r.xp6(5),r.Q6J("ngIf",n.registerForm.controls.repeatPassword.hasError("minlength")&&n.registerForm.controls.repeatPassword.touched),r.xp6(1),r.Q6J("ngIf",n.registerForm.controls.repeatPassword.hasError("required")&&n.registerForm.controls.repeatPassword.touched),r.xp6(1),r.Q6J("ngIf",n.registerForm.controls.repeatPassword.hasError("matchError")&&n.registerForm.controls.repeatPassword.touched),r.xp6(5),r.Q6J("ngIf",r.lcZ(44,18,n.isLoading$)))},dependencies:[i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u,l.rH,c.O5,L.O,m.KE,m.hX,m.TO,f.Nt,d.lW,c.Ov,M],styles:[".auth-container[_ngcontent-%COMP%]{display:flex;height:100vh;flex-direction:column;justify-content:center;align-items:center}.auth-form[_ngcontent-%COMP%]{width:450px;display:flex;flex-direction:column}.auth-title[_ngcontent-%COMP%]{text-align:center;font-size:40px;margin-bottom:var(--space-lg)}.auth-spinner[_ngcontent-%COMP%]{position:fixed;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;z-index:100;background-color:var(--spinner-background-color)}.auth-submit[_ngcontent-%COMP%]{margin-bottom:var(--space-sm)}.auth-link[_ngcontent-%COMP%]{text-decoration:none;color:var(--primary-contrast-color)}.auth-common-errors-container[_ngcontent-%COMP%]{margin-bottom:var(--space-md)}"]}),o})(),canActivate:[x]}];let lr=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[l.Bz.forChild(mr),l.Bz]}),o})(),cr=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[i.UX,c.ez,y.m,q.p0,U.Cq,N.JX,R.TU,m.lN,f.c,d.ot,lr]}),o})()}}]);