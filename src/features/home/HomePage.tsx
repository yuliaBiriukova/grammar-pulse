import React from "react";
import {testHref} from "../../common/constants";

export const HomePage = () => {
    return (
        <div className='content-container'>
            <h2 className='title'>Grammar Rules Review</h2>
            <p className='mt-3'>
                Welcome to GrammarPulse - the English learning website, where mastering grammar has never been easier!
                We've organized grammar rules according to English levels from A1 to C1, ensuring a smooth learning experience for learners of all stages.
            </p>
            <p>
                Not sure which level suits you best? No problem! Take a quick English level test by following the link&nbsp;
                <a href={testHref}>British Council Test</a>.
                Once you know where you stand, you can explore the relevant grammar topics at your pace.
            </p>
            <p>
                We believe in the power of practice, which is why we've prepared a range of interactive tasks and exercises for each topic.
                Apply your knowledge, reinforce your understanding, and watch your English skills flourish!
            </p>
            <p>
                Join us on this exciting journey of language learning, and let's unlock your full English potential together!
            </p>
        </div>
    );
}