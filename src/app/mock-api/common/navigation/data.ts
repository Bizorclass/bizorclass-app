/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/dashboard',
        accountType: ['teacher']
    },
    {
        id   : 'profile',
        title: 'Profile',
        type : 'basic',
        icon : 'heroicons_outline:user',
        link : '/profile',
        accountType: ['teacher']
    },
    // {
    //     id   : 'admins',
    //     title: 'Admins',
    //     type : 'basic',
    //     icon : 'heroicons_outline:users',
    //     link : '/admins'
    // },
    // {
    //     id   : 'courses',
    //     title: 'Courses',
    //     type : 'basic',
    //     icon : 'heroicons_outline:book-open',
    //     link : '/courses'
    // },
    // {
    //     id   : 'teachers',
    //     title: 'Teachers',
    //     type : 'basic',
    //     icon : 'heroicons_outline:clipboard-list',
    //     link : '/teachers'
    // },
    {
        id   : 'schedule',
        title: 'Schedule',
        type : 'basic',
        icon : 'heroicons_outline:calendar',
        link : '/schedule',
        accountType: ['teacher']
    },
    {
        id   : 'subscribed-student',
        title: 'Subscribed Student',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/subscribed-student',
        accountType: ['teacher']
    },
    {
        id   : 'classes',
        title: 'Classes',
        type : 'basic',
        icon : 'heroicons_outline:view-list',
        link : '/classes',
        accountType: ['teacher']
    },
    {
        id   : 'history-classes',
        title: 'History Classes',
        type : 'basic',
        icon : 'mat_outline:history',
        link : '/history-classes',
        accountType: ['teacher']
    },

    //todo ------------>   Student
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'mat_outline:home',
        link : 'student/home',
        accountType: ['student']
    },
    {
        id   : 'teachers',
        title: 'Teachers',
        type : 'basic',
        icon : 'mat_outline:group',
        link : 'student/teachers',
        accountType: ['student']
    },
    {
        id   : 'studentProfile',
        title: 'Profile',
        type : 'basic',
        icon : 'heroicons_outline:user',
        link : 'student/profile',
        accountType: ['student']
    },
    {
        id   : 'myClasses',
        title: 'My Classes',
        type : 'basic',
        icon : 'heroicons_outline:view-list',
        link : 'student/my-classes',
        accountType: ['student']
    },
    {
        id   : 'history',
        title: 'History',
        type : 'basic',
        icon : 'mat_outline:history',
        link : 'student/history',
        accountType: ['student']
    },
    {
        id   : 'howToUse',
        title: 'How To Use',
        type : 'basic',
        icon : 'heroicons_outline:information-circle',
        // link : 'student/how-to-use',
        link : 'how-to-use',
        accountType: ['student']
    },
    {
        id   : 'help',
        title: 'Help',
        type : 'basic',
        icon : 'heroicons_outline:phone',
        // link : 'student/how-to-use',
        link : 'help',
        accountType: ['student']
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
