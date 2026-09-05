import { useRef, useState, useEffect } from 'react'
import { Player } from '@lordicon/react'
import ICON from '../assets/icons/add.json'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const CopyAnimation = () => {
  const copyPlayerRef = useRef(null)

  const playCopyAnimation = () => {
    copyPlayerRef.current?.play()
  }

  return (
    <DotLottieReact
      src="/icons/Copy.lottie"
      tabIndex={0}
      aria-label="Copy password"
      dotLottieRefCallback={(dotLottie) => {
        copyPlayerRef.current = dotLottie
      }}
      onMouseEnter={playCopyAnimation}
      onFocus={playCopyAnimation}
      style={{ width: '38px', height: '38px', cursor: 'pointer' }}
    />
  )
}

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const playerRef = useRef(null)

  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])


  const showPass = () => {
    if (form.password.length > 0 && ref.current.src.includes("icons/view.png")) {
      ref.current.src = "icons/hide.png"
      passwordRef.current.type = "text"
    }
    else if (form.password.length > 0) {
      ref.current.src = "icons/view.png"
      passwordRef.current.type = "password"
    }
  }

  const savePassword = () => {
    setpasswordArray([...passwordArray, form])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    console.log([...passwordArray, form])
    setform({ site: "", username: "", password: "" })
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
    ref.current.src = "icons/view.png"
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
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
            <input ref={passwordRef} name='password' value={form.password} onChange={handleChange} type="password" minLength={4} maxLength={10} className='border-2 w-[97%] border-gray-500 p-3 m-2 text-white rounded-lg' placeholder="Enter Password" />
            <span className='absolute right-[4%] top-1/2 transform -translate-y-1/2 cursor-pointer'>
              <img ref={ref} onClick={() => showPass()} src="icons/view.png" alt="eye" />
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
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-900 opacity-80 overflow-hidden h-12' : 'bg-black opacity-80 overflow-hidden h-12'}>
                    <td className=' underline p-3 relative'><div className='flex justify-center items-center'><a href={item.site}>{item.site}</a><span onClick={() => copyToClipboard(item.site)} className='inline-block w-10 align-middle'><CopyAnimation /></span></div></td>
                    <td className=' p-3'><div className='flex justify-center items-center'> {item.username}<span onClick={() => copyToClipboard(item.username)} className='inline-block w-10 align-middle'><CopyAnimation /></span></div></td>
                    <td className=' p-3'><div className='flex justify-center items-center'>{item.password}<span onClick={() => copyToClipboard(item.password)} className='inline-block w-10 align-middle'><CopyAnimation /></span></div></td>
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
