import React from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import EnhancedLessonContent from '@/components/lessons/EnhancedLessonContent';
import { menuItems } from '@/data/menu-items';
import { useSessionStore } from '@/stores/sessionStore';

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const location = useLocation();
  const { getCurrentOrder } = useSessionStore();
  
  // Get the current order items
  const currentOrderItems = getCurrentOrder();
  
  // Find the current order for this lesson if it exists
  const currentOrder = currentOrderItems.find(order => order.menuItemId === lessonId);
  
  // Get coffee ID from order or from URL query params
  const coffeeId = currentOrder?.coffeeItemId || new URLSearchParams(location.search).get('coffee') || undefined;
  
  // Find the lesson
  const lesson = menuItems.find(item => item.id === lessonId);
  
  if (!lesson) {
    return <Navigate to="/not-found" />;
  }
  
  return (
    <Layout>
      <EnhancedLessonContent lesson={lesson} coffeeId={coffeeId} />
    </Layout>
  );
};

export default LessonPage;
