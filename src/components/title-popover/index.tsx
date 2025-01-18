import React, { JSX, useState } from 'react';
import "./style.css"
import Text from '../text';
import useOutsideClick from '../../hooks/useOutsideClick';

const TitlePopover = ({ text, url, description, dir = "LEFT", triggerType = "HOVER" }: { text: string; url: string | null; description: string | JSX.Element; dir?: "LEFT" | "RIGHT"; triggerType?: "CLICK" | "HOVER" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [ref] = useOutsideClick(() => setIsVisible(false))

    return (
        <div
            className="title-popover-container"
            {...(triggerType === "HOVER" ? {
                onMouseEnter: () => setIsVisible(true),
                onMouseLeave: () => setIsVisible(false)
            } : {
                onClick: () => setIsVisible(true)
            })}
        >
            {url ? <Text.PrimaryWithLink url={url} value={text} /> : text}
            {isVisible && (
                <div ref={ref} className={` popover-content ${dir === "RIGHT" ? "popover-content-right" : "popover-content-left"}`}>
                    {description}
                </div>
            )}
        </div>
    );
};

export default TitlePopover