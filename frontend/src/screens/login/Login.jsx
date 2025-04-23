import React from "react";
import logo from "../../../../assets/logo.png";
import axiosInstance from "../../../axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const nav = useNavigate()

  const handleLogin = async() => {
     const res = await axiosInstance.post('/admin/loginadmin',{
        email:email,
        password:password
     })
    const data = res.data
    if(data.data){
        toast.success(data.message)
        nav('/dashboard/home')
    }
    else{
        toast.error(data.message)
    }
  }



  return (
    <div className=" bg2   overflow-hidden">
      <div className=" py-2 px-4">
        <p className=" font-Montserrat  text-2xl text-white  font-bold">
          Hazoo.ai
        </p>
      </div>

      <div className=" w-full h-[93vh] flex flex-col items-center justify-center   ">
        <div>
          {/* <div className='flex gap-2'>
                <img src={logo} alt='logo' className=' w-[100px] rounded-full' />
                <img className='w-[100px] h-[100px] border-2 border-accent rounded-full object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZBwmIgtsBN10WIQslSrwQrSILs-ICtZPAA&s" alt="" />
            </div> */}

          <div className=" flex flex-col bg-slate-200 items-center justify-center p-14">
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-2xl font-Montserrat text-accent font-bold">
                Login into <span className=" text-primary">Hazoo.ai</span>
              </p>
              <label htmlFor="email" className="text-accent font-Montserrat">
                Email
              </label>
              <input
                placeholder="Enter Your Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded-md border-2  font-Montserrat border-accent focus:outline-none"
              />

              <label htmlFor="password" className="text-accent font-Montserrat">
                Password
              </label>
              <input
                placeholder="Enter Your Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded-md border-2 border-accent  font-Montserrat focus:outline-none"
              />

              <button onClick={()=>{
                handleLogin()
              }} className="bg-primary hover:bg-primary/65 text-slate-50 p-2 font-Montserrat rounded-md mt-4">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
