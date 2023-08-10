import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import {Navbar} from "./features/navbar/Navbar";
import {HomeContainer} from "./features/containers/HomeContainer";
import {LevelContainer} from "./features/containers/level/LevelContainer";
import {AddLevelContainer} from "./features/containers/level/AddLevelContainer";
import {EditLevelContainer} from "./features/containers/level/EditLevelContainer";
import {AddTopicContainer} from "./features/containers/topic/AddTopicContainer";
import {TopicContainer} from "./features/containers/topic/TopicContainer";
import {EditTopicContainer} from "./features/containers/topic/EditTopicContainer";
import {ExercisesListContainer} from "./features/containers/exercise/ExercisesListContainer";
import {ExerciseContainer} from "./features/containers/exercise/ExerciseContainer";
import {AddExerciseContainer} from "./features/containers/topic/AddExerciseContainer";
import {EditExerciseContainer} from "./features/containers/exercise/EditExerciseContainer";
import {LoginPage} from "./features/auth/LoginPage";
import {SignUpPage} from "./features/auth/SignUpPage";
import {PracticeContainer} from "./features/containers/practice/PracticeContainer";
import {PracticeResultContainer} from "./features/containers/practice/PracticeResultContainer";
import './App.css';

function App() {
      return (
            <Router>
                <Navbar />
                <Routes>
                    <Route
                        path="/signup"
                        element={ <SignUpPage /> }
                    />
                    <Route
                        path="/login"
                        element={ <LoginPage /> }
                    />
                    <Route
                        path="/"
                        element={ <HomeContainer /> }
                    />
                    <Route
                        path="levels/:levelId"
                        element={ <LevelContainer /> }
                    />
                    <Route
                        path="levels/new"
                        element={ <AddLevelContainer /> }
                    />
                    <Route
                        path="levels/:levelId/edit"
                        element={ <EditLevelContainer /> }
                    />
                    <Route
                        path="topics/:levelId/new"
                        element={ <AddTopicContainer /> }
                    />
                    <Route
                        path="topics/:levelId/:topicId"
                        element={ <TopicContainer /> }
                    />
                    <Route
                        path="topics/:levelId/:topicId/practice/:index"
                        element={ <PracticeContainer /> }
                    />
                    <Route
                        path="topics/:levelId/:topicId/practice/results"
                        element={ <PracticeResultContainer /> }
                    />
                    <Route
                        path="topics/:levelId/:topicId/edit"
                        element={ <EditTopicContainer /> }
                    />
                    <Route
                        path="exercises/:levelId/:topicId"
                        element={ <ExercisesListContainer /> }
                    />
                    <Route
                        path="exercises/:levelId/:topicId/:exerciseId"
                        element={ <ExerciseContainer /> }
                    />
                    <Route
                        path="exercises/:levelId/:topicId/new"
                        element={ <AddExerciseContainer /> }
                    />
                    <Route
                        path="exercises/:levelId/:topicId/:exerciseId/edit"
                        element={ <EditExerciseContainer /> }
                    />
                    <Route
                        path="*"
                        element={ <Navigate to="/" replace /> }
                    />
                </Routes>
            </Router>
      );
}

export default App;
