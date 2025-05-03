
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LessonContent from '@/components/lessons/LessonContent';
import { menuItems } from '@/data/menu-items';

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = menuItems.find(item => item.id === lessonId);
  
  if (!lesson) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <LessonContent lesson={lesson} />
    </Layout>
  );
};

export default LessonPage;
