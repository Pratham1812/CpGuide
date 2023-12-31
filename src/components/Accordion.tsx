import { AccordionData } from '../types';
import './Accordion.css';
import { useState } from 'react';

import AccordionItem from './AccordionItem';

function Accordion({ items }: { items: Array<AccordionData> }) {
    const [currentIdx, setCurrentIdx] = useState(-1);
    const btnOnClick = (idx: number) => {
      setCurrentIdx((currentValue:number) => (currentValue !== idx ? idx : -1));

    };
  
    return (
      <ul className="accordion">
        {items.map((item, idx) => (
          <AccordionItem
            key={idx}
            data={item}
            isOpen={idx === currentIdx}
            btnOnClick={() => btnOnClick(idx)}
          />
        ))}
      </ul>
    );
  }
  
  export default Accordion;