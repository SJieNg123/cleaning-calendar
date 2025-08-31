import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Expense {
  id?: string;
  description: string;
  amount: number;
  billingCycle: "monthly" | "bimonthly";
  date: string;
  category: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const COLLECTION_NAME = 'expenses';

// Add a new expense
export const addExpense = async (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...expense,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { id: docRef.id, ...expense };
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

// Update an existing expense
export const updateExpense = async (id: string, expense: Partial<Expense>) => {
  try {
    const expenseRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(expenseRef, {
      ...expense,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

// Delete an expense
export const deleteExpense = async (id: string) => {
  try {
    const expenseRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(expenseRef);
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

// Get all expenses
export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const expenses: Expense[] = [];
    
    querySnapshot.forEach((doc) => {
      expenses.push({
        id: doc.id,
        ...doc.data()
      } as Expense);
    });
    
    return expenses;
  } catch (error) {
    console.error('Error getting expenses:', error);
    throw error;
  }
};
