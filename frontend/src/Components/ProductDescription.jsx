import React, { useRef } from "react";
import JoditEditor from 'jodit-react';
export default function ProductDescription({setproductDescription}) {
    const editor = useRef(null);
  const handleChange = (content) =>{
	setproductDescription(content)
  }
    return (
        
        <JoditEditor
        className="ProductDescription"
		required
		value=""
			ref={editor}
			config = {{ theme : 'dark',  }}
			onChange = {(content)=> handleChange(content)}
		/>
    );
}





