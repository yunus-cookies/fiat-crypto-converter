import React from 'react'

export default function RenderSuggestions({suggestions, clickSuggestion}) {
    const size = 20;
    return (
        <div>
        <ul>
        {suggestions.slice(0, size).map((suggestion, index) => 
            <li onClick={() => clickSuggestion(suggestion)} key={index + '_' + suggestion}>{suggestion}</li>
        )}
        </ul>
        </div>
    )
}
