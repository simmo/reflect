import React from 'react'

import 'styles/components/modal'

const triggerFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
    }
}

const FullscreenModal = ({ hide }) => {
    console.dir(document.fullScreenEnabled)
    if (hide) {
        return null
    } else {
        return (
            <div className="modal">
                <div className="modal__content">
                    <h1 className="modal__text">Enable fullscreen?</h1>
                    <div className="modal__actions">
                        <button className="modal__button modal__button--confirm" onClick={triggerFullscreen}>Yes</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FullscreenModal
