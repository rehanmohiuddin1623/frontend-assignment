import React from 'react'
import "./style.css"

const PrimaryWithLink = ({ value, url }: { value: string, url: string }) => {
    return (
        <a href={url} className='primary-with-link' >
            {value}
        </a>
    )
}

const Text = Object.assign({}, { PrimaryWithLink })

export default Text
