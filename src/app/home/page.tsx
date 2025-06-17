import React from 'react';
import ServerComponent from "@/ServerComponent";
import ClientComponent from "@/ClientComponent";
const HomePage = async () => {
    const req = await fetch("https://reqres.in/api/users/2")
    const { data } = await req.json()

    return (
        <main className='mt-5 max-w-xl mx-auto'>
            <ServerComponent/>
            <ClientComponent name={`${data.first_name} ${data.last_name}`} />
        </main>
    );
};

export default HomePage;