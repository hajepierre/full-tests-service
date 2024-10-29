export class UpdateDeparmentDto {
    name: string
}


export class CreateDeparmentDto extends UpdateDeparmentDto{
    id?: string
}

