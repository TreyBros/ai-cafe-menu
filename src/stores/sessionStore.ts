
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface MenuItem {
  id: string;
  title: string;
  category: 'appetizer' | 'entree' | 'dessert';
}

interface LearningSession {
  sessionId: string;
  startTime: string;
  completedItems: MenuItem[];
  notes: string[];
  emailAddress?: string;
}

interface SessionStore {
  session: LearningSession;
  addCompletedItem: (item: MenuItem) => void;
  addNote: (note: string) => void;
  setEmail: (email: string) => void;
  resetSession: () => void;
  getReceipt: () => any;
}

const createInitialSession = (): LearningSession => ({
  sessionId: uuidv4(),
  startTime: new Date().toISOString(),
  completedItems: [],
  notes: [],
});

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      session: createInitialSession(),
      
      addCompletedItem: (item) => 
        set((state) => ({
          session: {
            ...state.session,
            completedItems: [...state.session.completedItems, item]
          }
        })),
      
      addNote: (note) => 
        set((state) => ({
          session: {
            ...state.session,
            notes: [...state.session.notes, note]
          }
        })),
      
      setEmail: (email) => 
        set((state) => ({
          session: {
            ...state.session,
            emailAddress: email
          }
        })),
      
      resetSession: () => 
        set({ session: createInitialSession() }),
      
      getReceipt: () => {
        const state = get();
        const session = state.session;
        
        // Calculate learning stats
        const categoriesCompleted = [
          ...new Set(session.completedItems.map(item => item.category))
        ].length;
        
        // Time spent calculation (simplified for now)
        const startTime = new Date(session.startTime);
        const endTime = new Date();
        const timeSpentMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
        
        return {
          sessionId: session.sessionId,
          date: new Date().toLocaleDateString(),
          items: session.completedItems,
          notes: session.notes,
          stats: {
            timeSpentMinutes,
            categoriesCompleted,
            totalItems: session.completedItems.length
          }
        };
      }
    }),
    {
      name: "vsp-ai-cafe-session",
    }
  )
);
