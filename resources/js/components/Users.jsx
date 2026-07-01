import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/apiSlice'; // Adjust the import path based on your file tree

const UserList = () => {
    const dispatch = useDispatch();
    
    // Grab the state slice. (Assumes you named this reducer 'users' in your store configuration)
    const { users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // 1. UI Rule: Show a loading indicator if fetching
    if (loading) {
        return <div>Loading users... Please wait.</div>;
    }

    // 2. UI Rule: Show error alert if something goes wrong
    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    // 3. UI Rule: Render the list if data exists
    return (
        <div>
            {/* <h2>Users List</h2> */}
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="border p-5 bg-black text-white flex justify-between">
                            <strong>{user.username}</strong> — {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;