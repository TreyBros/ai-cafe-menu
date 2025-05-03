
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface MenuItem {
  id: string;
  title: string;
  category: 'appetizer' | 'entree' | 'dessert';
  price: string;
  image?: string;
}

interface CoffeeItem {
  id: string;
  name: string;
  price: string;
  image?: string;
}

interface OrderItem {
  id: string;
  menuItemId: string;
  coffeeItemId?: string;
  timestamp: string;
  completed: boolean;
  notes?: string;
}

interface LearningSession {
  sessionId: string;
  userName?: string;
  startTime: string;
  completedItems: MenuItem[];
  selectedCoffees: CoffeeItem[];
  currentOrder: OrderItem[];
  completedOrders: OrderItem[];
  userNotes: string[];
  skillsAcquired: string[];
  emailAddress?: string;
  totalTimeSpent: number; // in minutes
}

interface SessionStore {
  session: LearningSession;
  addCompletedItem: (item: MenuItem) => void;
  addCoffeeToSelection: (coffee: CoffeeItem) => void;
  removeCoffeeFromSelection: (coffeeId: string) => void;
  createOrder: (menuItemId: string, coffeeItemId?: string, notes?: string) => void;
  completeOrderItem: (orderId: string) => void;
  addNote: (note: string) => void;
  addSkill: (skill: string) => void;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  updateTimeSpent: (minutes: number) => void;
  resetSession: () => void;
  getReceipt: () => any;
  getCurrentOrder: () => OrderItem[];
  getCompletedOrders: () => OrderItem[];
}

const createInitialSession = (): LearningSession => ({
  sessionId: uuidv4(),
  startTime: new Date().toISOString(),
  completedItems: [],
  selectedCoffees: [],
  currentOrder: [],
  completedOrders: [],
  userNotes: [],
  skillsAcquired: [],
  totalTimeSpent: 0,
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
      
      addCoffeeToSelection: (coffee) =>
        set((state) => ({
          session: {
            ...state.session,
            selectedCoffees: [...state.session.selectedCoffees, coffee]
          }
        })),
        
      removeCoffeeFromSelection: (coffeeId) =>
        set((state) => ({
          session: {
            ...state.session,
            selectedCoffees: state.session.selectedCoffees.filter(coffee => coffee.id !== coffeeId)
          }
        })),
        
      createOrder: (menuItemId, coffeeItemId, notes) =>
        set((state) => ({
          session: {
            ...state.session,
            currentOrder: [
              ...state.session.currentOrder,
              {
                id: uuidv4(),
                menuItemId,
                coffeeItemId,
                completed: false,
                timestamp: new Date().toISOString(),
                notes
              }
            ]
          }
        })),
        
      completeOrderItem: (orderId) =>
        set((state) => {
          // Find the order to complete
          const orderItem = state.session.currentOrder.find(item => item.id === orderId);
          
          if (!orderItem) return state;
          
          // Mark as completed and move to completed orders
          const completedOrder = { ...orderItem, completed: true };
          
          return {
            session: {
              ...state.session,
              currentOrder: state.session.currentOrder.filter(item => item.id !== orderId),
              completedOrders: [...state.session.completedOrders, completedOrder]
            }
          };
        }),
      
      addNote: (note) => 
        set((state) => ({
          session: {
            ...state.session,
            userNotes: [...state.session.userNotes, note]
          }
        })),
        
      addSkill: (skill) =>
        set((state) => ({
          session: {
            ...state.session,
            skillsAcquired: [...state.session.skillsAcquired, skill]
          }
        })),
        
      setUserName: (name) =>
        set((state) => ({
          session: {
            ...state.session,
            userName: name
          }
        })),
      
      setEmail: (email) => 
        set((state) => ({
          session: {
            ...state.session,
            emailAddress: email
          }
        })),
        
      updateTimeSpent: (minutes) =>
        set((state) => ({
          session: {
            ...state.session,
            totalTimeSpent: state.session.totalTimeSpent + minutes
          }
        })),
      
      resetSession: () => 
        set({ session: createInitialSession() }),
        
      getCurrentOrder: () => {
        return get().session.currentOrder;
      },
      
      getCompletedOrders: () => {
        return get().session.completedOrders;
      },
      
      getReceipt: () => {
        const state = get();
        const session = state.session || createInitialSession(); // Ensure we have a valid session
        
        // Safely handle potentially undefined values
        const completedItems = session.completedItems || [];
        const selectedCoffees = session.selectedCoffees || [];
        const skillsAcquired = session.skillsAcquired || [];
        const userNotes = session.userNotes || [];
        
        // Calculate learning stats
        const categoriesCompleted = [
          ...new Set((completedItems || []).map(item => item.category))
        ].length;
        
        // Time spent calculation
        const timeSpentMinutes = session.totalTimeSpent || 0;
        
        // Calculate order total
        const orderTotal = [
          ...completedItems,
          ...selectedCoffees
        ].reduce((total, item) => {
          const price = (item.price || "$0.00").replace('$', '');
          return total + parseFloat(price);
        }, 0);
        
        return {
          sessionId: session.sessionId,
          customerName: session.userName || "Valued Customer",
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          items: completedItems,
          coffees: selectedCoffees,
          completedOrders: session.completedOrders || [],
          notes: userNotes,
          skills: [...new Set(skillsAcquired)],
          stats: {
            timeSpentMinutes,
            categoriesCompleted,
            categoriesList: [...new Set((completedItems || []).map(item => item.category))],
            totalItems: completedItems.length,
            totalCoffees: selectedCoffees.length
          },
          totalAmount: orderTotal.toFixed(2),
          pricing: {
            subtotal: orderTotal.toFixed(2),
            tax: (orderTotal * 0.08).toFixed(2),
            total: (orderTotal * 1.08).toFixed(2),
            currency: "USD"
          },
          emailAddress: session.emailAddress
        };
      }
    }),
    {
      name: "vsp-ai-cafe-session",
    }
  )
);
