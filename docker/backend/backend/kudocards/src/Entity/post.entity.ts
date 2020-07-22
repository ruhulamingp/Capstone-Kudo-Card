
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ length: 500 })
  title: string;

  @Column("json")
  kudoType: string;

  @Column('int',{nullable:true})
  kudoId: number;

  @Column('text')
  content: string;

  @Column('text')
  fromEmail: string;

  @Column('text')
  fromName: string;

  @Column('text')
  toEmail: string;

  @Column('text')
  toName: string;


  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

 
}