import React from 'react'
import "./DesignOne.css"
import DesignOneBody from './DesignOneBody'
import DesignOneHeader from './DesignOneHeader'
import DesignOneProduct from './DesignOneProduct'
import ProductDiplay from './ProductDiplay'
export default function DesignOne() {
  return (
    <div className='DesignOne'>
      <DesignOneHeader />
      {/* <DesignOneBody /> */}
      {/* <DesignOneProduct /> */}
      <ProductDiplay />
    </div>
  )
}
