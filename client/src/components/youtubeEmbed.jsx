import React from 'react'

const YouTubeEmbed = ({ id, styles }) => (
  <iframe style={styles}
    src={`https://www.youtube.com/embed/${id}`} frameBorder="0"
    title={id}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen>
  </iframe>
)

export default YouTubeEmbed