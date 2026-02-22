import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const CreateStudents = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [form, setform] = useState({uucmsNo:"",department:"",semester:""});

    const handlechange = (e)=>{
        setform({...form,[e.target.name]:e.target.value});
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.post("http://localhost:3000/api/student/create",form,{
                headers:{"Content-Type":"application/json"},
                withCredentials:true
            });
            console.log(data)
            if(data.success){
                console.log(data);
                toast.success(data.message);
                setform({uucmsNo:"",department:"",semester:""});
                navigate(`/student/dash/${data.create._id}`);
            }



        } catch (err) {
            console.log(err.message);
            toast.error(err?.response?.data?.message);
            
        }
    }
  return (
    <>
    <form onSubmit={handlesubmit}>
        <input type="text" name="uucmsNo" value={form.uucmsNo} onChange={handlechange} placeholder='UUCMS NO' />
        <select name="department" value={form.department} onChange={handlechange}>
            <option value="">Select Course</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="BCOM">BCOM</option>
        </select>

        <select name="semester" value={form.semester} onChange={handlechange}>
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>

        <button>Submit</button>


    </form>
    
    </>
  );
}

export default CreateStudents;
