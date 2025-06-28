import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
    console.log("Container Render")

    return (
        <div className='border-2 rounded-xl border-red-50'>
            { children }
        </div>
    )
}