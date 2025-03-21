import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { User } from './user.entity';

@Entity({ name: 'cards_members' })
export class CardMember {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'card_id', type: 'bigint' })
  cardId!: string;

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: string;

  @ManyToOne(() => Card, (card) => card.cardMembers)
  @JoinColumn({
    name: 'card_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_cards_members_card_id',
  })
  card!: Card;

  @ManyToOne(() => User, (user) => user.cardMembers)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_cards_members_user_id',
  })
  user!: User;
}
