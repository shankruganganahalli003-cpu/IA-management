import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateIA = () => {

  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    uucmsNo: "",
    semester: "",
    department: "",
    IA1: "",
    IA2: "",
    IA3: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Fetch IA data
  const fetchData = async () => {
    try {
      const {data} = await axios.get(
        `http://localhost:3000/api/marks/getme/${id}`
      );

      setForm(data.finddata);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Update IA marks
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/api/marks/update/${id}`,
        form
      );
      navigate("/teacher/submitted-IA");

    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-80 p-5 shadow-lg"
      >
        <h2 className="text-xl font-bold text-center">Update IA Marks</h2>

        <input
          type="text"
          name="uucmsNo"
          value={form.uucmsNo}
          onChange={handleChange}
          placeholder="UUCMS No"
        />

        <input
          type="number"
          name="IA1"
          value={form.IA1}
          onChange={handleChange}
          placeholder="IA1"
        />

        <input
          type="number"
          name="IA2"
          value={form.IA2}
          onChange={handleChange}
          placeholder="IA2"
        />

        <input
          type="number"
          name="IA3"
          value={form.IA3}
          onChange={handleChange}
          placeholder="IA3"
        />

        <button className="bg-blue-500 text-white p-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateIA;