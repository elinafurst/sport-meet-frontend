export interface UnitPage {

    totalPages: number
    totalElements: number
    dtos: Unit[]
}

export class UnitForm {
    name: string
    description: string
    
    public constructor(init?: Partial<UnitForm>) {
        Object.assign(this, init);
    }     
}

export interface Unit {
    unitNumber: string
    name: string
    description: string
    noOfMembers: number
    noOfEvents: number
}

export interface UnitDetails {
    unitNumber: string
    name: string
    description: string
    admins: {[key:number]:string}
    members: {[key:number]:string}
    noOfMembers: number
    isMember: boolean
}