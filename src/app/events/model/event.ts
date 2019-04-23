export interface Event {
    eventNumber: string
    name: string
    description: string
    sport: string
    eventStartDate: string
    eventStartTime: string
    maxParticipants: number
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
    maxParticipants: number
    byUnit: string
    city: string
    area: string
    meetingPoint: string

    public constructor(init?: Partial<EventForm>) {
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
    maxParticipants: number
    noOfParticipants: number
    active: boolean
    city: string
    area: string
    participants: {[key:number]:string}
    createdBy:  {[key:number]:string}
    byUnit: {[key:number]:string}
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
