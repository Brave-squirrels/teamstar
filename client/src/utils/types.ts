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
}

export interface TeamInvitation {
    teamId: string;
    teamName: string;
}

export interface Team {
    teamId: string;
    teamName: string;
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
}

export interface Owner {
    id: string;
    name: string;
}

export interface User {
    name: string,
    id: string
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
    owner: Owner | {};
    date: Date | string;
    users: User[],
    tasks: TeamTask[],
    raports: TeamRaport[],
    calendar: string,
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
    calendar: '',
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