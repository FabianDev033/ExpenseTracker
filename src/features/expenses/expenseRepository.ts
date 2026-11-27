import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';

import { db } from '../../services/firebase';
import type { Expense } from './types';

const EXPENSES_COLLECTION = 'expenses';

export type NewExpenseInput = Omit<Expense, 'id'>;

function mapExpenseDoc(snapshotDoc: QueryDocumentSnapshot<DocumentData>): Expense {
  const data = snapshotDoc.data({ serverTimestamps: 'estimate' });

  return {
    id: snapshotDoc.id,
    name: typeof data.name === 'string' ? data.name : '',
    amount: typeof data.amount === 'number' && Number.isFinite(data.amount) ? data.amount : 0,
    category: typeof data.category === 'string' ? data.category : '',
  };
}

export function subscribeToExpenses(
  onData: (expenses: Expense[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const expensesQuery = query(
    collection(db, EXPENSES_COLLECTION),
    orderBy('createdAt', 'desc'),
  );

  return onSnapshot(
    expensesQuery,
    (snapshot) => {
      onData(snapshot.docs.map(mapExpenseDoc));
    },
    onError,
  );
}

export function createExpense(input: NewExpenseInput) {
  return addDoc(collection(db, EXPENSES_COLLECTION), {
    name: input.name,
    amount: input.amount,
    category: input.category,
    createdAt: serverTimestamp(),
  });
}

export function removeExpense(id: string) {
  return deleteDoc(doc(db, EXPENSES_COLLECTION, id));
}
