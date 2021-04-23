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

export const UserBasic: UserData = {
    name: '',
    email: '',
    workTime: '',
    isActive: true,
    teamInvitation: [{ teamId: '', teamName: '' }],
    teams: [{ teamId: '', teamName: '' }],
    tasks: [{ teamId: '', taskName: '', taskId: '' }],
}