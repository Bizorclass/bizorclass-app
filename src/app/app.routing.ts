import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthService } from './modules/auth/auth.service';

const authService = new AuthService();

const userIsStudent = authService.userIsStudent();

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

  // Redirect empty path to '/example'
  { path: '', pathMatch: 'full', redirectTo: userIsStudent ? "student/home" : 'dashboard' },

  // Redirect signed-in user to the '/example'
  //
  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

  // Auth routes for guests
  {
    path: '',
    canMatch: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
      { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
      { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
      { path: 'access-account', loadChildren: () => import('app/modules/auth/access-account/access-account.module').then(m => m.AccessAccountModule) },
      { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
      { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) },
      { path: 'teacher-sign-up', loadChildren: () => import('app/modules/auth/teacher-sign-up/teacher-sign-up.module').then(m => m.AuthTeacherSignUpModule) },
    ]
  },

  // Auth routes for authenticated users
  {
    path: '',
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
      { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
    ]
  },

  // Landing routes
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
    ]
  },

  // Admin routes
  {
    path: '',
    canMatch: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      //! ------------> for Teacher
      { path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'admins', loadChildren: () => import('app/modules/admin/admins/admins.module').then(m => m.AdminsModule) },
      { path: 'teachers', loadChildren: () => import('app/modules/admin/teachers/teachers.module').then(m => m.TeachersModule) },
      { path: 'courses', loadChildren: () => import('app/modules/admin/courses-page/courses-page.module').then(m => m.CoursesModule) },
      { path: 'profile', loadChildren: () => import('app/modules/admin/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'schedule', loadChildren: () => import('app/modules/admin/schedule/schedule.module').then(m => m.ScheduleModule) },
      { path: 'subscribed-student', loadChildren: () => import('app/modules/admin/subscribed-student/subscribed-student.module').then(m => m.SubscribedStudentModule) },
      { path: 'history-classes', loadChildren: () => import('app/modules/admin/history-classes/history-classes.module').then(m => m.HistoryClassesModule) },
      { path: 'classes', loadChildren: () => import('app/modules/admin/classes/classes.module').then(m => m.ClassesModule) },
      { path: 'calender-demo', loadChildren: () => import('app/modules/admin/calender-demo/calender-demo.module').then(m => m.CalenderDemoModule) },
      { path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },

      //! ------------> for Student
      { path: 'student/home', loadChildren: () => import('app/modules/student/home/home.module').then(m => m.HomeModule) },
      { path: 'student/profile', loadChildren: () => import('app/modules/Student/student-profile/student-profile.module').then(m => m.ProfileModule) },
      { path: 'student/home/:teacher_id', loadChildren: () => import('app/modules/student/teacher-details/teacher-details.module').then(m => m.TeacherDetailsModule) },
      { path: 'student/teachers', loadChildren: () => import('app/modules/student/teachers/teachers.module').then(m => m.TeachersModule) },
      { path: 'student/teachers/:teacher_id', loadChildren: () => import('app/modules/student/teacher-details/teacher-details.module').then(m => m.TeacherDetailsModule) },
      { path: 'student/courses/:course_id', loadChildren: () => import('app/modules/student/course-details/course-details.module').then(m => m.CourseDetailsModule) },
      { path: 'student/my-classes', loadChildren: () => import('app/modules/student/my-classes/my-classes.module').then(m => m.MyClassesModule) },
      { path: 'student/my-classes/class-details/:orderId', loadChildren: () => import('app/modules/student/class-details/class-details.module').then(m => m.ClassDetailsModule) },
      { path: 'student/history', loadChildren: () => import('app/modules/student/history-classes/history-classes.module').then(m => m.HistoryClassesModule) },
      { path: 'student/change-teacher/:orderId/teachers', loadChildren: () => import('app/modules/student/teachers/teachers.module').then(m => m.TeachersModule) },
      { path: 'student/change-teacher/:orderId/teachers/:teacher_id', loadChildren: () => import('app/modules/student/teacher-details/teacher-details.module').then(m => m.TeacherDetailsModule) },

      //! --------------> Common
      { path: 'terms-conditions', loadChildren: () => import('app/modules/landing/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },
      { path: 'how-to-use', loadChildren: () => import('app/modules/landing/how-to-use/how-to-use.module').then(m => m.HowToUseModule) },
      { path: 'help', loadChildren: () => import('app/modules/landing/help/help.module').then(m => m.HelpModule) },

    ]
  }
];
