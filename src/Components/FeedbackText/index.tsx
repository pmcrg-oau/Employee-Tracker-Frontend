import React, { FC } from 'react';

import './FeedbackText.styles.scss';

type FeedbackTextProps = {
    message: string;
}

const FeedbackText: FC<FeedbackTextProps> = ({ message }) => {
    return (
        <div className="feedback__text">
            {message}
        </div>
    );
}

export default FeedbackText;
