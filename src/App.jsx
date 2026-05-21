import './App.css';
import React, { useState } from 'react';

export default function SectionSwitcher() {
  const [activeSection, setActiveSection] = useState(1);

  return (
    <div>
      <div>
        <button
          onClick={() => setActiveSection(1)}>
          Section 1
        </button>
        <button
          onClick={() => setActiveSection(2)}>
          Section 2
        </button>
        <button
          onClick={() => setActiveSection(3)}>
          Section 3
        </button>
      </div>

      <div>
        {activeSection === 1 && (
          <p>this is the first paragraph</p>
        )}

        {activeSection === 2 && (
          <p>this is the second paragraph</p>
        )}

        {activeSection === 3 && (
          <p>this is the third paragraph</p>
        )}
      </div>
    </div>
  );
}
