import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './audit';
import { List } from './list.entity';
import { Label } from './label.entity';
import { BoardMember } from './board-member.entity';

@Entity({ name: 'boards', schema: 'public' })
export class Board {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'pk_boards_id',
  })
  id!: string;

  @Column({
    name: 'board',
    type: 'varchar',
    length: 256,
  })
  name!: string;

  @Column({
    name: 'background_color',
    type: 'varchar',
    length: '50',
  })
  backgroundColor!: string;

  @OneToMany(() => List, (list) => list.board)
  lists!: List[];

  @OneToMany(() => Label, (label) => label.board)
  labels!: Label[];

  @OneToMany(() => BoardMember, (boardMember) => boardMember.board)
  boardMembers!: BoardMember[];

  @Column(() => Audit, { prefix: false })
  audit!: Audit;
}
