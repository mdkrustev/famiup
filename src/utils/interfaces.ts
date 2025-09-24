export interface IUser {
    id: string,
    name: string,
    email: string
    loginroom_id: string
}

export interface ISocketMessage {
    action: 'login' | 'logout',
    room: 'loginroom',
    message: any
}