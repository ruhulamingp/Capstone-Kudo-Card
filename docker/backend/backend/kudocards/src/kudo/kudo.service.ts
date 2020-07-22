
import { Posts } from './../Entity/post.entity';
import { CreateKudoDto } from './../DTO/CreateKudoDto';

import { Injectable, Inject } from '@nestjs/common';
import { Repository, Like, In, Any } from 'typeorm';
import { Observable, from } from 'rxjs';
import { QueryParams } from '../DTO/QueryParamDTO';


@Injectable()
export class KudoService {

    constructor(
        @Inject('POSTS_REPOSITORY')
        private kudoRepository: Repository<Posts>
      ) {


      }


    
    public async  findAllFromDB(queryParams : QueryParams): Promise<Posts[]>  {
       
        

        const whereClause = {

            fromEmail: Like(`%${queryParams.fromEmail}%`),
            toEmail: Like(`%${queryParams.toEmail}%`),
            content: Like(`%${queryParams.query}%`),
            kudoId: queryParams.kudoId
    
           
        };

       

        if (!queryParams.fromEmail) delete whereClause.fromEmail;
        if (!queryParams.toEmail) delete whereClause.toEmail;
        if (!queryParams.query) delete whereClause.content;
        if (!queryParams.kudoId) delete whereClause.kudoId;
       




        console.log(queryParams);
       
        return this.kudoRepository.find(
            {
                where  : whereClause,
                order: {
                    id: "DESC"
                },
                skip : queryParams.skip ?  queryParams.skip : 0 ,
                take : queryParams.take ? queryParams.take : 10 
            }
        );

    }

    public deleteItem(fromEmail : string,queryParams : QueryParams) : Promise<any> {
        
        return this.kudoRepository.delete({ id: queryParams.kudoId, fromEmail : fromEmail });

    }
   
    public create(createKudoDto : CreateKudoDto) : Promise<CreateKudoDto> {
        
        delete createKudoDto.id ;
        return this.kudoRepository.save(createKudoDto);

    }

    public update(createKudoDto : CreateKudoDto) : Promise<CreateKudoDto> {
        
        return this.kudoRepository.save(createKudoDto).then( val => {
            console.log(val);
            return val ;
        });

    }
   

    public findAll(): Observable<Posts[]>  {
        
        return from(this.kudoRepository.find());

    }


}
