import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * PopUp component to display a modal with custom content and buttons.
 *
 * @param {React.Component} contentComponent - The component to be displayed inside the popup.
 * @param {number} width - The width of the popup.
 * @param {number} height - The height of the popup.
 * @param {Array} buttons - An array of button components to be displayed in the popup. ex [["Ok", true],["Cancel", false]]
 *
 * @returns {Promise} A promise that resolves when the popup is closed.
 *  
 * 
*/
/**
 * PopUp component renders a modal popup with customizable content and buttons.
 *
 * @param {Object} props - The properties object.
 * @param {React.Component} props.contentComponent - The component to be displayed inside the popup.
 * @param {string} props.width - The width of the popup.
 * @param {string} props.height - The height of the popup.
 * @param {Array} props.buttons - An array of button configurations, where each button is represented as an array with the button label and the result to be passed to the onClose callback.
 * @param {Function} props.onClose - Callback function to be called when the popup is closed. Receives the result of the button click as an argument.
 *
 * @returns {JSX.Element} The rendered PopUp component.
 */
function PopUp({ contentComponent, width, height, buttons, onClose }) {
    const [open, setOpen] = useState(true);

    const handleClose = (result) => {
        setOpen(false);
        onClose(result);
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${open ? '' : 'hidden'}`}>
            <div className={`fixed flex flex-col gap-10 justify-between top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-5`} style={{ width, height }}>
                {contentComponent}
                <div className='flex justify-end gap-2'>
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            onClick={() => handleClose(button[1])}
                            className='px-3 py-1 bg-primary text-black rounded-md'
                        >
                            {button[0]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * Opens a popup with the specified content and dimensions.
 *
 * @param {React.Component} contentComponent - The React component to be displayed inside the popup.
 * @param {number} width - The width of the popup. If null, the popup will fit the content.
 * @param {number} height - The height of the popup. If null, the popup will fit the content.
 * @param {Array} buttons - An array of button configurations to be displayed in the popup.
 * @returns {Promise} A promise that resolves with the result when the popup is closed.
 */
function OpenPopUp(contentComponent, width, height, buttons) {
    return new Promise((resolve) => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const root = createRoot(div);

        const handleClose = (result) => {
            root.unmount();
            document.body.removeChild(div);
            resolve(result);
        };

        root.render(
            <PopUp
                contentComponent={contentComponent}
                width={width}
                height={height}
                buttons={buttons}
                onClose={handleClose}
            />
        );
    });
}

export { OpenPopUp };