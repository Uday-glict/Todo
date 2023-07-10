import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [todolist, setTodolist] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        const url = "/api/v1/todolist/index";
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => setTodolist(res))
            .catch(() => navigate("/"));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    const filteredTodoList = todolist.filter((item) => {
        const isTitleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        if (statusFilter === "all") {
            return isTitleMatch;
        } else if (statusFilter === "active") {
            return isTitleMatch && !item.completed;
        } else if (statusFilter === "completed") {
            return isTitleMatch && item.completed;
        }
    });

    return (
        <>
            <div className="container-fluid" id="main-container">
                <div className="card" id="main-card">
                    <div className="search-bar" style={{display:"flex",flexWrap:"nowrap",marginRight:"10px"}}>
                        <input
                            type="text"
                            class="form-control"

                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{width:"50%"}}
                        />
                        <select value={statusFilter} onChange={handleStatusFilter}>
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <table className="table" id="main">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center" id="main-body">
                            {filteredTodoList.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <input type="checkbox" checked={item.completed} />
                                    </td>
                                    <td>
                                        <Link to={`/home/update/${item.id}`} className="btn btn-info">
                                            Update Todo
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <Link
                            to="/home/AddList"
                            className="btn btn-info"
                            role="button"
                        >
                            Add List
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
