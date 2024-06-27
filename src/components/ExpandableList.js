import React, { useState } from 'react';
import { Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandableList = ({ category }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="flex items-center cursor-pointer p-2 border rounded hover:bg-gray-100"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <h2 className="text-lg font-bold">{category.name}</h2>
        <ExpandMoreIcon className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </div>
      <Collapse in={expanded}>
        <div className="ml-4">
          {category.subcategories && category.subcategories.map((subcategory, index) =>
            typeof subcategory === 'object' ? (
              <ExpandableList key={index} category={subcategory} />
            ) : (
              <div key={index} className="p-2">
                <h3 className="font-medium">{subcategory}</h3>
              </div>
            )
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default ExpandableList;
