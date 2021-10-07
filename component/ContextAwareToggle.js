import React, {useContext} from 'react'
import {AccordionContext, Card, useAccordionButton} from "react-bootstrap";

const ContextAwareToggle = ({ children, eventKey, callback }) => {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default ContextAwareToggle;