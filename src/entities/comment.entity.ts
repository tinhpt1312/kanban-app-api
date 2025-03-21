import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Audit } from './audit';

@Entity({ name: 'comments', schema: 'public' })
export class Comment {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'pk_comments_id',
  })
  id!: string;

  @Column({
    name: 'content',
    type: 'text',
  })
  content!: string;

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    nullable: true,
  })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  @Column({ name: 'card_id', type: 'bigint' })
  cardId!: string;

  @ManyToOne(() => Card, (card) => card.comments)
  @JoinColumn({
    name: 'card_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_card_comments_id',
  })
  card!: Card;

  @Column(() => Audit, { prefix: false })
  audit!: Audit;
}
