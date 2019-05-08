export interface EventPage{

    totalPages: number
    totalElements: number
    dtos: Event[]
}

export interface Event {
    eventNumber: string
    name: string
    description: string
    sport: string
    eventStartDate: string
    eventStartTime: string
    noOfParticipants: number
    active: boolean
    city: string
    area: string
    meetingPoint: string

}

export class EventForm {
    name: string
    description: string
    sport: string
    eventStartDate: string
    eventStartTime: string
    byUnit: string
    city: string
    area: string
    meetingPoint: string

    public constructor(init?: Partial<EventForm>) {
        Object.assign(this, init);
    }     
}

export class RequestForm {
    eventNumber: string
    message: string

    public constructor(init?: Partial<RequestForm>) {
        Object.assign(this, init);
    } 
}

export class RequestDetails {
    requestNumber: string
    requestStatus: number
    event: {[key:number]:string}
    sender: {[key:number]:string}
    receiver: {[key:number]:string} 
    messages: Message[]
    isRequester: boolean
    isRead: boolean
}

export class Request {
    requestNumber: string
    requestStatus: number
    event: {[key:number]:string}
    sender: {[key:number]:string}
    receiver: {[key:number]:string} 
    message: Message
    isRequester: boolean
    isRead: boolean
}

export class RequestAnwer {
    isApproved: boolean;

    public constructor(init?: Partial<RequestAnwer>) {
        Object.assign(this, init);
    } 
}

export interface Message {
    messageNumber: string
    message: string
    timeStamp: string
    author: {[key:number]:string}
    isAuthorOfMessage: boolean
    isRead: boolean
}

export class MessageForm {
    message: string
    public constructor(init?: Partial<MessageForm>) {
        Object.assign(this, init);
    } 
}

export interface EventDetails {
    eventNumber: string
    name: string
    description: string
    sport: string
    eventStartDate: string
    eventStartTime: string
    noOfParticipants: number
    active: boolean
    city: string
    area: string
    meetingPoint: string
    participants: {[key:number]:string}
    createdBy:  {[key:number]:string}
    byUnit: {[key:number]:string}
    isCreator: boolean
    requestStatus:string
    comments: Comment[]
}

export interface Comment {
    commentNumber: string
    comment: string
    date: string
    time: string
    by: {[key:number]:string}
    owner: boolean
}

export class CommentForm {
    comment: string

    public constructor(init?: Partial<CommentForm>) {
        Object.assign(this, init);
    }  
}

export class EventFilter {
    sport: string
    city: string
    fromDate: string
    toDate: string
    area: string

    public constructor(init?: Partial<EventFilter>) {
        Object.assign(this, init);
    }  
}

export interface Location {
    city: string
    areas: string[]
}
