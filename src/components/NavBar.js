import React from 'react'



export default function NavBar({handleSelectChange}) {
  

    return (
        <div>
          <select
          onChange={handleSelectChange}
          label="Currency"
        >
          <option value={20}>Fiat</option>
          <option value={30}>Crypto</option>
        </select>
        </div>
    )
}
