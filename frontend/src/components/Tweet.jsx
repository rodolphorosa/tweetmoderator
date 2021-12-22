import React from "react";
import { useEffect } from "react";

function Tweet({tweet}) {
    return (
        <div>
            <span>{tweet}</span>
        </div>
    )
}

export default Tweet;