import cloudImage from '@/assets/cloud.png'

interface SidebarGraphicProps {
  variant: 'login' | 'register'
}

const SidebarGraphic = ({ variant }: SidebarGraphicProps) => {
  const isLogin = variant === 'login'
  const clipPath = isLogin
    ? 'polygon(0 0, 100% 0, 85% 100%, 0 100%)'
    : 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
  const gradientStyle = isLogin
    ? {
        right: -40,
        borderRadius: '0 40px 40px 0',
        background:
          'linear-gradient(120deg, rgba(0,0,0,0.09) 25%, rgba(0,0,0,0) 75%)',
      }
    : {
        left: -40,
        borderRadius: '40px 0 0 40px',
        background:
          'linear-gradient(-120deg, rgba(0,0,0,0.09) 25%, rgba(0,0,0,0) 75%)',
      }

  const cloudPositions = isLogin
    ? [
        { top: 30, left: -150, w: 400, o: 90 },
        { top: -60, left: 320, w: 420, o: 80 },
        { bottom: -30, left: -120, w: 480, o: 70 },
        { bottom: 180, left: 200, w: 490, o: 80 },
      ]
    : [
        { top: 30, left: -150, w: 400, o: 90 },
        { top: -60, left: 320, w: 420, o: 80 },
        { bottom: -30, left: -120, w: 480, o: 70 },
        { bottom: 180, left: 200, w: 490, o: 80 },
      ]

  return (
    <div
      className="flex-[7] flex items-center justify-center relative overflow-hidden"
      style={{ background: '#00004C', clipPath }}
    >
      {cloudPositions.map((p, i) => (
        <img
          key={i}
          src={cloudImage}
          alt="cloud"
          className={`absolute ${
            p.top != null ? `top-[${p.top}px]` : `bottom-[${p.bottom}px]`
          } left-[${p.left}px] w-[${p.w}px] opacity-${p.o}`}
        />
      ))}
      <span className="text-white text-4xl font-bold z-10">Logo Here</span>
      <div
        className="absolute top-0 h-full w-[80px] pointer-events-none"
        style={{
          ...gradientStyle,
          filter: 'blur(6px)',
          position: 'absolute',
          height: '100%',
          width: '80px',
        }}
      />
    </div>
  )
}

export default SidebarGraphic