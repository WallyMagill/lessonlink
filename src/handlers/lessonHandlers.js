// currently not being used, considering deleting
import axios from 'axios';
import useStore from '../store';

const useLessonHandlers = () => {
  const store = useStore();

  const handleCreateLesson = async (lessonData) => {
    try {
      const newLesson = await store.createLesson(lessonData);
      return newLesson;
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw error;
    }
  };

  const handleUpdateLesson = async (id, lessonData) => {
    try {
      const updatedLesson = await store.updateLesson(id, lessonData);
      return updatedLesson;
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
  };

  const handleDeleteLesson = async (id) => {
    try {
      await store.deleteLesson(id);
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw error;
    }
  };

  const handleFetchLesson = async (id) => {
    try {
      await store.fetchLesson(id);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      throw error;
    }
  };

  const updateLessonColor = async (lessonId, color) => {
    try {
      const response = await axios.patch(`/api/lessons/${lessonId}/color`, { color });
      console.log('made it to updateLC');
      return response.data;
    } catch (error) {
      console.error('Error picking color:', error);
      throw error;
    }
  };

  const handleFetchAllLessons = async () => {
    try {
      await store.fetchAllLessons();
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  };

  return {
    handleCreateLesson,
    handleUpdateLesson,
    handleDeleteLesson,
    handleFetchLesson,
    handleFetchAllLessons,
    updateLessonColor,
  };
};

export default useLessonHandlers;
