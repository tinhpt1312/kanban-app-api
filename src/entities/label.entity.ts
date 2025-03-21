import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';
import { Audit } from './audit';
import { CardLabel } from './card-label.entity';

@Entity({ name: 'labels', schema: 'public' })
export class Label {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'pk_labels_id',
  })
  id!: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: '256',
  })
  title!: string;

  @Column({
    name: 'color',
    type: 'varchar',
    length: '50',
  })
  color!: string;

  @Column({
    name: 'board_id',
    type: 'bigint',
  })
  boardId!: string;

  @ManyToOne(() => Board, (board) => board.labels)
  @JoinColumn({
    name: 'board_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_labels_board_id',
  })
  board!: Board;

  @OneToMany(() => CardLabel, (cardLabel) => cardLabel.label)
  cardLabels!: CardLabel[];

  @Column(() => Audit, { prefix: false })
  audit!: Audit;
}
