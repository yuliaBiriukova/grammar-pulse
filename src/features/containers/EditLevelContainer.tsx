import React from "react";
import {EditLevelForm} from "../levels/EditLevelForm";
import {LevelsList} from "../levels/LevelsList";

export const EditLevelContainer = () => {
    return (
        <div className="container">
            <LevelsList/>
            <EditLevelForm/>
        </div>
    );
}