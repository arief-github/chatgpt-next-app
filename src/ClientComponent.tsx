'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import Container from "@/Container";

type UserTypes = {
    children: React.ReactNode
}
const ClientComponent = ({ children }: UserTypes) => {
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

            {/*<p>{name}</p>*/}

            <Container>
                {children}
            </Container>
        </div>
    );
};

export default ClientComponent;