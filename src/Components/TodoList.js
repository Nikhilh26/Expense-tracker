import React from 'react'
import Todo from './Todo'

export default function TodoList({ list, handleonClickDelete }) {
    return (
        <>
            <div className='App-flex-column-2'>

                <div className='manage-overflow'>
                    {
                        list.map((element) => {

                            return <Todo key={element.id} name={element.name} handle={handleonClickDelete} id={element.id}
                                header={element.category} type={element.type} date={element.date} />

                        })
                    }
                </div>

            </div>

        </>
    )
}
