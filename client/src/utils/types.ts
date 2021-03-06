export interface UserData {
    isVerified?: boolean;
    _id?: string;
    token?: string;
    id?: string;
    name: string;
    email: string;
    date?: string;
    workTime: string;
    isActive: boolean;
    teamInvitation: TeamInvitation[];
    teams: Team[];
    tasks: Task[];
    reports: Report[];
    chats: Chat[];
    times: any;
    breakTime: any;
    isOnline: boolean;
}

export interface TeamInvitation {
    teamId: string;
    teamName: string;
}

export interface Team {
    teamId: string;
    teamName: string;
}

export interface Chat {
    teamId: string,
    chatId: string,
    chatName: string
}

export interface Task {
    teamId: string;
    taskId: string;
    taskName: string;
}

export interface Report {
    reportId: string;
    reportName: string;
}

export interface Chat {
    teamId: string;
    chatId: string;
    chatName: string;
}

export const UserBasic: UserData = {
    name: '',
    email: '',
    workTime: '',
    isActive: true,
    teamInvitation: [],
    teams: [],
    tasks: [],
    reports: [],
    chats: [],
    times: {
        startTime: '',
        endTime: '',
    },
    breakTime: '',
    isOnline: true,
}

export interface Owner {
    id: string;
    name: string;
}

export interface User {
    name: string,
    id: string
}

export interface TeamUser {
    name: string,
    id: string,
    status: any,
}

export interface TeamTask {
    name: string;
    userName: string;
    userId: string;
    id: string;
}

export interface TeamRaport {
    name: string;
    userId: string;
    userName: string;
    id: string;
}

export interface TeamInvite {
    userId: string;
    userName: string;
}
export interface TeamData {
    name: string;
    description: string;
    owner: Owner | {} | any;
    date: Date | string;
    users: TeamUser[],
    tasks: TeamTask[],
    raports: TeamRaport[],
    calendarId: string,
    invitations: TeamInvite[],
}

export const basicTeam: TeamData = {
    name: '',
    description: '',
    owner: {},
    date: '',
    users: [],
    tasks: [],
    raports: [],
    calendarId: '',
    invitations: [],
}

export interface TaskUser {
    userId: string,
    userName: string,
}

export interface TaskTeam {
    teamName: string,
    teamId: string,
}
export interface TaskSchema {
    users: TaskUser[],
    name: string,
    description: string,
    status: string,
    team: TaskTeam | {}
}

export const basicTask: TaskSchema = {
    users: [],
    name: '',
    description: '',
    status: '',
    team: {}
}

export interface CalendarAuthor {
    id: string;
    name: string;
}
export interface CalendarEvent {
    author: CalendarAuthor;
    title: string;
    start: any;
    end: any;
    desc: string;
    fromHour: string;
    toHour: string;
}

export interface CalenderSchema {
    events: CalendarEvent[]
}

export const basicCalendar = {
    events: [],
}

export interface MessageInterface {
    _id: string,
    authorName: string,
    authorId: string,
    content: string,
    date: Date
}

export interface ChatSchema {
    _id: string,
    name: string,
    teamId: string,
    messages: MessageInterface[]
}

export const basicChat = {
    _id: '',
    name: '',
    teamId: '',
    messages: []
}

export interface RaportAuthor {
    id: any,
    name: string,
}

export interface RaportTeam {
    id: any;
    name: string;
}

export interface Raport {
    name: string,
    description: string,
    author: RaportAuthor,
    date: any,
    team: RaportTeam,
}

export const basicRaport = {
    name: '',
    description: '',
    author: {
        id: '',
        name: '',
    },
    date: '',
    team: {
        id: '',
        name: '',
    },
}