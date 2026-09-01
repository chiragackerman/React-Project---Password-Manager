import { useRef, useState, useEffect } from 'react'
import { Player } from '@lordicon/react'
import ICON from '../assets/icons/add.json'

const Manager = () => {
  const ref = useRef()
  const playerRef = useRef(null)

  const [form, setform] = useState({site:"", username:"", password:""})
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if(passwords){
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])
  

  const showPass = () => {
    if (ref.current.src.includes("icons/hide.png")) {
      ref.current.src = "icons/view.png"
    } else {
      ref.current.src = "icons/hide.png"
    }
  }

  const savePassword = () => {
    setpasswordArray([...passwordArray, form])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    console.log([...passwordArray, form])
  }

  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <div className="heading">
        <h1 className='text-3xl tracking-wider font-bold text-center my-4'>PassMan - Your Own Password Manager</h1>
      </div>
      <div className="inputcontainer w-[70vw] mx-auto relative flex flex-col items-center justify-center">
        <input name='site' value={form.site} onChange={handleChange} type="text" minLength={3} className='border-2 w-[99%] border-gray-500 p-3 m-2 text-white rounded-lg' placeholder="Enter URL" />
        <div className="flex w-[70vw] relative justify-center">
          <input name='username' value={form.username} onChange={handleChange} type="text" minLength={3} maxLength={20} className='border-2 w-[50%] border-gray-500 p-3 m-2 text-white rounded-lg' placeholder="Enter Username" />
          <div className="relative w-[50%]">
            <input name='password' value={form.password} onChange={handleChange} type="text" minLength={4} maxLength={10} className='border-2 w-[97%] border-gray-500 p-3 m-2 text-white rounded-lg' placeholder="Enter Password" />
            <span className='absolute right-[4%] top-1/2 transform -translate-y-1/2 cursor-pointer'>
              <img ref={ref} onClick={showPass} src="icons/hide.png" alt="eye" />
            </span>
          </div>
        </div>
        <button
          onClick={savePassword}
          className='flex cursor-pointer font-bold items-center justify-center gap-2 bg-white text-black p-2 px-3 m-2 rounded-xl'
          onMouseEnter={() => playerRef.current?.playFromBeginning()}
          onFocus={() => playerRef.current?.playFromBeginning()}
        >
          Add Password
          <span>
            <Player
              ref={playerRef}
              icon={ICON}
              size={30}
            />
          </span>
        </button>
      </div>
      <div className="passwords w-[70vw] mx-auto my-4">
        {passwordArray.length === 0 && (
          <h2 className='text-2xl tracking-wider font-bold text-center my-4'>No Passwords Saved Yet</h2>
        )}
        {passwordArray.length > 0 && 
          <h2 className='text-2xl tracking-wider font-bold text-center my-4'>Your Saved Passwords</h2>
        }
        {passwordArray.length > 0 && 
        <div className="passwordlists">
          <table className=' rounded-xl overflow-hidden border-collapse table-fixed text-lg border w-full border-gray-500'>
            <thead>
              <tr className='bg-black opacity-80 text-white'>
                <th className=' p-3 w-2/4'>Site</th>
                <th className=' p-3 w-1/4'>Username</th>
                <th className=' p-3 w-1/4'>Password</th>
              </tr>
            </thead>
            <tbody className='text-white text-center'>
              {passwordArray.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-900 opacity-80' : 'bg-black opacity-80'}>
                  <td className='underline p-3'><a href={item.site}>{item.site}</a></td>
                  <td className=' p-3'>{item.username}</td>
                  <td className=' p-3'>{item.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        }
      </div>
    </div>
  )
}

export default Manager
