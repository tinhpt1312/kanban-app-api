import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';
import { User } from './user.entity';

@Entity({ name: 'board_members', schema: 'public' })
export class BoardMember {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'pk_board_members_id',
  })
  id!: string;

  @Column({
    name: 'board_id',
    type: 'bigint',
  })
  boardId!: string;

  @ManyToOne(() => Board, (board) => board.boardMembers)
  @JoinColumn({
    name: 'board_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_board_members_board_id',
  })
  board!: Board;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId!: string;

  @ManyToOne(() => User, (user) => user.boardMembers)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_board_members_user_id',
  })
  user!: User;
}
