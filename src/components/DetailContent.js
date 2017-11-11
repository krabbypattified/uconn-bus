import React from 'react'
import 'assets/DetailContent.css'

// content: [DOM]
// nocontent: String
export default ({content, noContent}) => (
  <div className='DetailContent'>
    {content.length ? content : <NoContent>{noContent}</NoContent>}
  </div>
)




let NoContent = ({children}) => (
  <div className='NoContent'>
    <div>{children}</div>
    <div>You may need to <a onClick={()=>window.location.reload()}>refresh the app</a>.</div>
  </div>
)
