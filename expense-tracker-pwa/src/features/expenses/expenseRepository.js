import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../services/firebase';

const EXPENSES_COLLECTION = 'expenses';

/**
 * @typedef {import('../../data/mockExpenses').Expense} Expense
 * @typedef {import('./useExpenses').NewExpenseInput} NewExpenseInput
 */

/**
 * @param {Date} date
 * @returns {string}
 */
function formatLocalISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * @param {import('firebase/firestore').DocumentData} data
 * @returns {string | undefined}
 */
function extractExpenseDate(data) {
  if (data.createdAt instanceof Timestamp) {
    return formatLocalISODate(data.createdAt.toDate());
  }
  if (typeof data.date === 'string' && data.date.length > 0) {
    return data.date;
  }
  return undefined;
}

/**
 * @param {import('firebase/firestore').QueryDocumentSnapshot<import('firebase/firestore').DocumentData>} snapshotDoc
 * @returns {Expense}
 */
function mapExpenseDoc(snapshotDoc) {
  const data = snapshotDoc.data({ serverTimestamps: 'estimate' });
  const date = extractExpenseDate(data);

  return {
    id: snapshotDoc.id,
    name: typeof data.name === 'string' ? data.name : '',
    amount: typeof data.amount === 'number' && Number.isFinite(data.amount) ? data.amount : 0,
    category: typeof data.category === 'string' ? data.category : '',
    ...(date ? { date } : {}),
    ...(typeof data.notes === 'string' && data.notes.length > 0 ? { notes: data.notes } : {}),
  };
}

/**
 * @param {(expenses: Expense[]) => void} onData
 * @param {(error: Error) => void} onError
 * @returns {import('firebase/firestore').Unsubscribe}
 */
export function subscribeToExpenses(onData, onError) {
  const expensesQuery = query(collection(db, EXPENSES_COLLECTION), orderBy('createdAt', 'desc'));

  return onSnapshot(
    expensesQuery,
    (snapshot) => {
      onData(snapshot.docs.map(mapExpenseDoc));
    },
    onError,
  );
}

/** @param {NewExpenseInput} input */
export function createExpense(input) {
  return addDoc(collection(db, EXPENSES_COLLECTION), {
    name: input.name,
    amount: input.amount,
    category: input.category,
    createdAt: serverTimestamp(),
    ...(input.notes ? { notes: input.notes } : {}),
  });
}

/** @param {string} id */
export function removeExpense(id) {
  return deleteDoc(doc(db, EXPENSES_COLLECTION, id));
}
