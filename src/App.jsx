import React from 'react'
import AnimatedText from './components/SmokeFadeText'

const App = () => {

  return (
    <div className='w-screen min-h-screen'>
      <AnimatedText text='A B C D E F G H I J K L M N' className='text-9xl' delay={0.7} effect='RotationScale' staggerWithIndex stagger={0.03} rotationValue={10} scaleValue={1.2} />
    </div>
  )
}

export default App
