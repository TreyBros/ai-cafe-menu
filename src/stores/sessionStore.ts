
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface MenuItem {
  id: string;
  title: string;
  category: string; // Changed from enum to string to include 'course' and 'workshop' types
  price: string;
  image?: string;
  description?: string;
  difficulty?: string;
  duration?: string;
  highlights?: string[];
  content?: any;
  proceedToLesson?: boolean;
  featured?: boolean;
  badges?: string[];
}

interface CoffeeItem {
  id: string;
  name: string;
  price: string;
  image?: string;
  description?: string;
  flavorNotes?: string[];
}

interface OrderItem {
  id: string;
  menuItemId: string;
  coffeeId?: string; // Make sure coffeeId exists
  completed: boolean;
  timestamp: string;
  notes?: string;
}

interface CompletedOrder {
  date: string;
  items: OrderItem[];
}

interface LearningSession {
  sessionId: string;
  userName?: string;
  startTime: string;
  completedItems: string[]; // Store only IDs, not full objects
  selectedCoffees: CoffeeItem[];
  currentOrder: OrderItem[];
  completedOrders: CompletedOrder[]; // Updated to use CompletedOrder type
  userNotes: string[];
  skillsAcquired: string[];
  emailAddress?: string;
  totalTimeSpent: number; // in minutes
  notes: string[]; // Added notes property
}

interface SessionStore {
  session: LearningSession;
  addCompletedItem: (itemId: string) => void; // Changed to accept ID instead of object
  addCoffeeToSelection: (coffee: CoffeeItem) => void;
  removeCoffeeFromSelection: (coffeeId: string) => void;
  createOrder: (menuItemId: string, coffeeId?: string, notes?: string) => void;
  completeOrderItem: (orderId: string) => void;
  addNote: (note: string) => void;
  addSkill: (skill: string) => void;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  updateTimeSpent: (minutes: number) => void;
  resetSession: () => void;
  getReceipt: () => any;
  getCurrentOrder: () => OrderItem[];
  getCompletedOrders: () => CompletedOrder[];
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
  notes: [], // Initialize notes property
});

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      session: createInitialSession(),
      
      addCompletedItem: (itemId) => 
        set((state) => ({
          session: {
            ...state.session,
            completedItems: [...state.session.completedItems, itemId]
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
        
      createOrder: (menuItemId, coffeeId, notes) =>
        set((state) => ({
          session: {
            ...state.session,
            currentOrder: [
              ...state.session.currentOrder,
              {
                id: uuidv4(),
                menuItemId,
                coffeeId,
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
          
          // Create a CompletedOrder object
          const completedOrderEntry: CompletedOrder = {
            date: new Date().toISOString(),
            items: [completedOrder]
          };
          
          return {
            session: {
              ...state.session,
              currentOrder: state.session.currentOrder.filter(item => item.id !== orderId),
              completedOrders: [...state.session.completedOrders, completedOrderEntry]
            }
          };
        }),
      
      addNote: (note) => 
        set((state) => ({
          session: {
            ...state.session,
            userNotes: [...state.session.userNotes, note],
            notes: [...(state.session.notes || []), note] // Update both arrays for compatibility
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
        
        // Calculate learning stats
        const categoriesCompleted = [
          ...new Set(completedItems)
        ];
        
        // Calculate order total
        const orderTotal = selectedCoffees.reduce((total, item) => {
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
          notes: session.userNotes || [],
          skills: [...new Set(skillsAcquired)],
          stats: {
            timeSpentMinutes: session.totalTimeSpent || 0,
            categoriesCompleted: categoriesCompleted.length,
            categoriesList: categoriesCompleted,
            totalItems: completedItems.length,
            totalCoffees: selectedCoffees.length
          },
          pricing: {
            subtotal: orderTotal.toFixed(2),
            tax: (orderTotal * 0.08).toFixed(2),
            total: (orderTotal * 1.08).toFixed(2),
            currency: "USD"
          },
          emailAddress: session.emailAddress,
          totalItems: completedItems.length,
          totalAmount: orderTotal.toFixed(2),
        };
      }
    }),
    {
      name: "vsp-ai-cafe-session",
    }
  )
);
