import React from "react";
import {LevelsList} from "../levels/LevelsList";
import {AddLevelForm} from "../levels/AddLevelForm";

export const AddLevelContainer = () => {
    return (
        <div className="container">
            <LevelsList/>
            <AddLevelForm/>
        </div>
    );
}