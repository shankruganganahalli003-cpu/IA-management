import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminDashBoard from './admin/AdminDashBoard';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import TeacherManege from './admin/TeacherManege';
import AllTeachers from './admin/AllTeachers';
import AssignTeachers from './admin/AssignTeachers';
import Updateteachers from './admin/Updateteachers';
import GetStudents from './admin/GetStudents';
import Studentmanage from './admin/Studentmanage';
import StudentDashBoard from './students/StudentDashBoard';
import CreateStudentsbyadmin from './admin/CreateStudentsbyadmin';
import UUcms from './students/Uucms';
import TeacherDashBoard from './teacher/TeacherDashBoard';
import Mymarks from './students/Mymarks';
import UploadIA from './teacher/UploadIA';
import UpdateStudents from './admin/UpdateStudents';
import SubmittedIAmarks from './teacher/SubmittedIAmarks';
import UpdateIA from './teacher/UpdateIA';

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>

      
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Home/>} />
    


    <Route element={<ProtectedRoute allowedRoles={["admin"]}/>} >
    <Route path='/admin' element={<AdminDashBoard/>} />
    <Route path='/admin/teacher' element={<TeacherManege/>} />
    <Route path='/admin/teacher/getall' element={<AllTeachers/>} />
    <Route path='/admin/teacher/assign' element={<AssignTeachers/>} />
    <Route path='/admin/updateteachers/:id' element={<Updateteachers/>} />
    <Route path='/admin/getstudents' element={<GetStudents/>} />
    <Route path='/admin/students' element={<Studentmanage/>} />
    <Route path='/admin/students/create' element={<CreateStudentsbyadmin/>} />
    
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["student","admin"]}/>}>
      <Route path='/student' element={<StudentDashBoard/>} />
      <Route path='/student/uucms' element={<UUcms/>} />
      <Route path='/admin/updatestudent/:id' element={<UpdateStudents/>} />
      <Route path='/student/uucms/:uucmsNo/:department/:semester' element={<Mymarks/>} />


     
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["teacher"]}/>}>
       <Route path='/teacher' element={<TeacherDashBoard/>} />
       <Route path='/teacher/IA' element={<UploadIA/>} />
       <Route path='/teacher/submitted-IA' element={<SubmittedIAmarks/>} />
       <Route path='/teacher/updateIA/:id' element={<UpdateIA/>} />

    </Route>



    </Routes>
    
    
    </>
  );
}

export default App;
