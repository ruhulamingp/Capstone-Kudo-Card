export class CreateKudoDto {

    public id : number ;
    public title: string;
    public kudoType: string;
    public kudoId: number;
    public content: string ;
    public fromEmail: string;
    public fromName: string;
    public toName: string;
    public toEmail: string;
    

}

export class KudoTypeDTO {

    public id: number ;
    public title: string;
    public color: string;
    public icon: string ;



}