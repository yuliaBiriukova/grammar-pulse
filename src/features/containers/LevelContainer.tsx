import React from "react";
import {LevelsList} from "../levels/LevelsList";
import {LevelPage} from "../levels/LevelPage";

export const LevelContainer = () => {
    return (
        <div className="container">
            <LevelsList/>
            <LevelPage/>
        </div>
    );
}