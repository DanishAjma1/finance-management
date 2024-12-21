"use client"
import * as React from 'react';
import DrawerList from '../DrawerList/page';
import useMediaQuery from '@mui/system/useMediaQuery';
import { useTheme } from '@mui/system';
import Image from 'next/image';
import { Divider } from '@mui/material';


export default function Sidebar() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
    {!isMd && (
      <div>
        <div className='flex justify-center flex-col items-center mt-5'>
          <Image src={"/Fm.jpg"} height={100} width={100} alt='nothing' className='rounded-[50%]' />
          <p className='font-serif'>Danish Ajmal</p>
        </div>
        <div className='mt-5'>
        <Divider textAlign="left" className='font-mono'>Main Componants</Divider>
        <DrawerList />
        </div>
      </div>
    )}
    </div>
  );
}
