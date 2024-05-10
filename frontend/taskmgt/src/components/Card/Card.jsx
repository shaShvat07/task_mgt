import React from 'react'

const Card = () => {
    return (
        <>
            <div className='w-[90%] h-48 md:w-64 lg:w-80 lg:h-64 bg-gray-800 rounded-lg  relative mt-5'>
                <div className='text-lg ml-3 p-3'>
                    Title
                </div>
                <div className='flex justify-around'>
                    <div className='bg-red-500 p-2 rounded-lg text-xs'>
                        High Priority
                    </div>
                    <div className='bg-violet-500 p-2 text-xs rounded-lg'>
                        Tomorrow
                    </div>
                </div>
                <div className='text-xs mt-3 ml-2 mr-2'>
                    So basically I have to do random things like lorem ipsum mf what the hell are u doing!
                </div>
                <div className='flex bottom-2 right-2 absolute'>
                    <img src="/edit.svg" />
                    <img src="/delete.svg" />
                </div>
            </div>
        </>
    )
}

export default Card;