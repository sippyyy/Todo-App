import {createContext,useState,useEffect} from 'react'
import jwtDecode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{
    // localStorage.getItem('authTokens'
    const [authTokens,setAuthTokens]= useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user,setUser] = useState(()=>authTokens ? jwtDecode(authTokens.access): null)
    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault();
        let { username, password } = e.target.elements;
        let formData = new FormData();
        formData.append('username', username.value);
        formData.append('password', password.value);
      
        let response = await fetch('http://localhost:8000/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData),
        });
        let data = await response.json()
        if(response.status === 200 || response.status === 201){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate("/",{replace:true})
        }else{
            console.log('Error: ' + response.status)
        }
      };

    const logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate("/login",{replace:true})
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
} 