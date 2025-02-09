import React, { useState } from 'react'
import { ResetAccountModal } from '../modals/ResetAccountModal'

type Links = {
  reset: string
}

export default function ResetAccountButton({
  handle,
  links,
  ariaHideApp = true,
}: {
  handle: string
  links: Links
  ariaHideApp?: boolean
}): JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <button
        type="button"
        className="c-reset-account-button btn-alert btn-m"
        onClick={() => setOpen(!open)}
      >
        Reset account
      </button>
      <ResetAccountModal
        open={open}
        onClose={() => setOpen(false)}
        handle={handle}
        endpoint={links.reset}
        ariaHideApp={ariaHideApp}
      />
    </React.Fragment>
  )
}
