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