import React from 'react';

const ServerComponent = async () => {
    // useState tidak dapat digunakan pada komponen server
    // const [count, setCount] = useState<number>(0)

    // useEffect tidak dapat digunakan pada komponen server
    // useEffect(() => {
    //     console.log('ClientComponent Effect')
    // }, []);

    // server komponen hanya melakukan proses pengambilan data
    // const req = await fetch("https://reqres.in/api/users/2")
    // const { data } = await req.json()

    console.log('Server Component')
    return (
        <div className='my-5'>
            <h1 className='font-bold text-2xl'>Server Component</h1>
            {/*<p> {`${data.first_name} ${data.last_name}`}</p>*/}
        </div>
    );
};

export default ServerComponent;