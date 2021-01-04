import React, { Fragment } from "react";

export function ExitButton( { canExit = true, eventCallback, card_id } ) {
    if ( !canExit ) {
        return <Fragment />
    }
    
    return (
        // <div className={'exit-btn-wrapper'}>
            <div
                className={'exit-btn'}
                onClick={
                    () => eventCallback(
                        {
                            action : 'remove',
                            card_id : card_id
                        }
                    )
                }
            >
                <div>X</div>
            </div>
        // </div>
    )
}
