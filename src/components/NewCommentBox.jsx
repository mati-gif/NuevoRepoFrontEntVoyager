import React, { useState } from 'react';
function NewCommentBox({name,ratingg,revieww}) {

    const [rating, setRating] = useState(ratingg);
    const [review, setReview] = useState(revieww);

    return (

        <div style={{
            backgroundColor: '#1f2937',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '100%',
            color: 'white',
            marginTop:"50px"
        }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                }}>
                    {name.charAt(0)}
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{name}</h2>
            </div>
            <div style={{ display: 'flex', marginBottom: '16px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setRating(star)}
                        style={{
                            cursor: 'pointer',
                            color: star <= rating ? '#fbbf24' : '#6b7280',
                            fontSize: '1.5rem',
                            marginRight: '4px'
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                style={{
                    width: '100%',
                    backgroundColor: '#374151',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '8px',
                    marginBottom: '16px',
                    border: 'none'
                }}
                rows={3}
                placeholder="Escribe tu reseña aquí..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />

        </div>
    )
}

export default NewCommentBox