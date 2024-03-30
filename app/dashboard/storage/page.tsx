import React from 'react'

const FileManagerPage = () => {
    return (
        <div className='w-[1024px] overflow-y-scroll'>
            <iframe src="/file-storage" allowFullScreen loading='lazy' className='w-full min-h-[600px] h-full overflow-y-scroll p-2 mb-10'></iframe>
        </div>
    )
}

export default FileManagerPage  