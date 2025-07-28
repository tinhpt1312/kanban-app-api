import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CheckList } from './check-list.entity';
import { Audit } from './audit';

@Entity({ name: 'checklists_items', schema: 'public' })
export class ChecklistItem {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: string;

  @Column({ name: 'title', type: 'varchar', length: 50 })
  title!: string;

  @Column({ name: 'checklist_id', type: 'bigint' })
  checklistId!: string;

  @CreateDateColumn({
    name: 'due_date',
    type: 'timestamp',
    nullable: true,
  })
  dueDate!: Date;

  @ManyToOne(() => CheckList, (checklist) => checklist.items)
  @JoinColumn({
    name: 'checklist_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_checklist_items_checklist_id',
  })
  checklist!: CheckList;

  @Column({ name: 'is_completed', type: 'boolean', default: false })
  isCompleted!: boolean;

  @Column(() => Audit, { prefix: false })
  audit!: Audit;
}
