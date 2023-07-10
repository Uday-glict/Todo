import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const Show = () => {


    const params = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");




    

    const onSubmit = (event) => {
        event.preventDefault();
        const url = `/api/v1/todolist/update/${id}`;

        if (title.length == 0 || description.length == 0 || completed.length == 0)
            return;

        const body = {
            title,
            description,
            completed

        };



        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {

            method: "PUT",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },

            body: JSON.stringify(body),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");

        }).then((response) => navigate("/"))
            .catch((error) => console.log(error.message));

    };
   
    return (

        <>
            <div className="container-fluid" style={{display:"flex",flexWrap:"nowrap",width:"100%",height:"100vh",justifyContent:"center",alignItems:"center",backgroundImage:"linear-gradient(to right, rgba(23, 55, 132, 0.651),rgba(13, 136, 189, 0.744),rgb(0, 255, 242),rgba(0, 81, 128, 0.64),rgba(0, 0, 255, 0.426),rgba(76, 0, 130, 0.47),rgba(168, 130, 238, 0.579))"}} >
               <div style={{width:"80%",display:"flex",flexWrap:"nowrap",padding:"20px 20px 20px 20px"}}>
                
                <div className="col-md-6">
                    <div className="card" style={{marginLeft:"20px"}} >

                        <form>
                        <br/>
                        <br/>
                             <h1 className="text-center" >Add Todo List</h1>
                             <br/>
                             <br/>
                            <div className="mb-3">
                                     
                                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>

                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={title} onChange={(e) => setTitle(e.target.value)} />

                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

                            </div>
                            <br/>
                            <br/>
                            <div className="mb-3">

                                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>

                                <input type="text" className="form-control" id="exampleInputPassword1"  />

                            </div>
                            <br/>
                            <br/>
                            <div className="mb-3 form-check">

                                <input type="checkbox" className="form-check-input" id="exampleCheck1"  />

                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out for<span><strong>Active / Completed Status</strong></span> </label>

                            </div>
                            <br/>
                            <br/>
                            <button type="submit" className="btn btn-primary" onClick={()=>onSubmit(item.id)}>Submit</button>
                             <Link to="/" className="btn btn-primary" style={{float:"right"}}>Back To Home</Link>
                        </form>




                    </div>
                </div>
                </div> 
            </div>

            



        </>

    )

}
export default Show;
