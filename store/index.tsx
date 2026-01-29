import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import subjectSlice from '@/store/slices/subjectSlice';
import courseSlice from '@/store/slices/courseSlice';
import clubSlice from '@/store/slices/clubSlice';
import authSlice from '@/store/slices/authSlice';
import dashboardSlice from '@/store/slices/dashboardSlice';
import studentSlice from '@/store/slices/studentSlice';
import teacherSlice from '@/store/slices/teacherSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    subjects: subjectSlice,
    courses: courseSlice,
    clubs: clubSlice,
    auth: authSlice,
    dashboard: dashboardSlice,
    students: studentSlice,
    teachers: teacherSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof configureStore>['dispatch'];
