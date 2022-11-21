import React, { useRef } from "react";
import JoditEditor from 'jodit-react';
export default function ProductDescription({ initialValue, getValue }) {
    const editor = useRef(null);

    return (
        
        <JoditEditor
        className="ProductDescription"
			ref={editor}
			value={initialValue}
			// config={config}
			tabIndex={2} // tabIndex of textarea
			// onChange={newContent => {}}
		/>
    );
}





