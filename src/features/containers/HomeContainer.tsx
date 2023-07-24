import React from "react";
import {LevelsList} from "../levels/LevelsList";
import {HomePage} from "../home/HomePage";

export const HomeContainer = () => {
    return (
        <div className="container">
            <LevelsList/>
            <HomePage/>
        </div>
    );
}