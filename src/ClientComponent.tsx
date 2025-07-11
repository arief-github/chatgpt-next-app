'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';

type UserTypes = {
    name: string
}
const ClientComponent = ({ name }: UserTypes) => {
    const [counter, setConter] = useState<number>(0)
    console.log('Client Component')

    // effect tidak dirender oleh server

    useEffect(() => {
        console.log('ClientComponent Effect')
    }, []);

    useLayoutEffect(() => {
        console.log('ClientComponent Layout Effect')
    }, []);

    return (
        <div className='my-5'>
            <h1 className='font-bold text-2xl'>Client Component</h1>
            <p>Counter : {counter}</p>
            <button onClick={() => setConter(counter + 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold'>Increment</button>

            <p>{name}</p>
        </div>
    );
};

export default ClientComponent;