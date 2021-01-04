import React from 'react';
import { ExitButton } from "./ExitButton";

export function AppCard( props ) {
    return <div className={'app-card '+props.className}>
        <ExitButton canExit={props.showExitBtn} card_id={props.card_id} eventCallback={props.eventCallback} />
        {props.children}
    </div>
}

