import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';
import { Card } from './card.entity';

@Entity({ name: 'lists', schema: 'public' })
export class List {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'pk_lists_id',
  })
  id!: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: '256',
  })
  title!: string;

  @Column({
    name: 'position',
    type: 'int',
  })
  position!: number;

  @Column({
    name: 'is_archived',
    type: 'boolean',
    default: false,
  })
  isArchived!: boolean;

  @Column({
    name: 'board_id',
    type: 'bigint',
  })
  boardId!: string;

  @ManyToOne(() => Board, (board) => board.lists)
  @JoinColumn({
    name: 'board_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_lists_board_id',
  })
  board!: Board;

  @OneToMany(() => Card, (card) => card.list)
  cards!: Card[];
}
