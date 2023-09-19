
import {HiOutlineMenu} from 'react-icons/hi'
import {RiCloseLine } from 'react-icons/ri'

import { NavLink } from 'react-router-dom';
import {logo} from '../assets'
import {links} from '../assets/constants'
import { useState } from 'react';

const NavLinks = ({handleClick}) =>{
  return <div className='mt-10'>
    {links.map((item) =>(
      <NavLink
      className='flex flex-row justify-start my-8 text-sm font-medium text-gray-400 hover:text-cyan-400 '
      key={item.name}
      to={item.to} 
      onClick={handleClick && handleClick}
      >
        <item.icon className=' w-6 h-6 mr-2'/>
        {item.name}
      </NavLink>
    ))}
  </div>
}

const Sidebar = () => {
 const [mobieMenuOpen, setMobieMenuOpen] = useState(false)

  return<>
   <div className="md:flex hidden flex-col w-[240px] py-10 px-10 bg-[#191624] ">
    <img src={logo} alt="logo" className='w-full h-14 object-contain' />
    <NavLinks/>
  </div>

  <div className=' absolute top-6 right-6 md:hidden block'>
    {mobieMenuOpen ?
    <RiCloseLine className='w-6 h-6 text-white mr-2 z-10'  onClick={() => setMobieMenuOpen(false)}/> :
    <HiOutlineMenu className='w-6 h-6 text-white mr-2 z-10' onClick={() => setMobieMenuOpen(true)}/>
  }
  </div>

  <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl
   from-white/10 to-[#383d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition  ${mobieMenuOpen ? 'left-0' : '-left-full'}`}>
    <img src={logo} alt="logo" className='w-full h-14 object-contain' />
    <NavLinks handleClick={()=> setMobieMenuOpen(false)}/>
  </div>
  </>
};

export default Sidebar;
 