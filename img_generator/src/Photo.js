import React from 'react'

const Photo = ({id, urls: {regular}, links: {download}, alt_description}) => {
    return (
        <>
        <article className="photo">
            <img src={regular} alt={alt_description} />
        </article>

        </>
    )
}

export default Photo
