export interface IUser {
    name: string,
    email: string
}

export interface ISocketMessage {
    action: 'login' | 'logout',
    room: 'loginroom',
    message: any
}