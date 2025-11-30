export const COMPANY_NAME = "Smart Tracking Inc.";

export interface NavItem {
    title: string;
    url: string;
    icon: string;
    children?: {
        title: string;
        href: string;
    }[];
}

export const NAVBAR_DATA: {
    navMain: NavItem[];
    navSecondary: NavItem[];
} = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: 'IconDashboard',
        },
        {
            title: "Calendar",
            url: "/calendar",
            icon: 'IconCalendar',
        },
        {
            title: "Status",
            url: "/status",
            icon: 'IconAnalyze',
        },
        {
            title: "Analytics",
            url: "/analytics",
            icon: 'IconChartBar',
        },
        {
            title: "Projects",
            url: "/projects",
            icon: 'IconFolder',
        },
        {
            title: "Team",
            url: "/team",
            icon: 'IconUsers',
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/settings",
            icon: 'IconSettings',
        },
        {
            title: "Get Help",
            url: "/help",
            icon: 'IconHelp',
        },
        {
            title: "Search",
            url: "/search",
            icon: 'IconSearch',
        },
    ],
}