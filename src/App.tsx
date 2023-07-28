import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import {Navbar} from "./features/navbar/Navbar";
import {HomeContainer} from "./features/containers/HomeContainer";
import {LevelContainer} from "./features/containers/LevelContainer";
import {AddLevelContainer} from "./features/containers/AddLevelContainer";
import {EditLevelContainer} from "./features/containers/EditLevelContainer";

import './App.css';
import {AddTopicContainer} from "./features/containers/AddTopicContainer";
import {TopicContainer} from "./features/containers/TopicContainer";
import {EditTopicContainer} from "./features/containers/EditTopicContainer";

function App() {
      return (
            <Router>
                <Navbar />
                <Routes>
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
                        path="topics/:levelId/:topicId/edit"
                        element={ <EditTopicContainer /> }
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
